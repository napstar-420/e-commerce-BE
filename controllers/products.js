const config = require('../config');
const debug = require('debug')('myapp:products_controller');
const PRODUCTS_REPO = require('../repositories/products');
const { validationResult } = require('express-validator');
const { SERVER_STATUSES } = config;
const {
    PRODUCT_FETCHED_SUCCESSFULLY,
    PRODUCT_CREATED_SUCCESSFULLY,
    PRODUCT_UPDATED_SUCCESSFULLY,
    PRODUCT_DELETED_SUCCESSFULLY,
    PRODUCT_NOT_FOUND,
} = require('../lib/responses');

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

async function getProduct(req, res) {
    const product_id = req.params.id;
    const condition = { product_id };

    try {
        const product = await PRODUCTS_REPO.getProduct(condition);

        // Product not found
        if (!product) {
            return res.status(SERVER_STATUSES.NOT_FOUND).json({ message: PRODUCT_NOT_FOUND })
        }

        // Return data
        return res.json({
            message: PRODUCT_FETCHED_SUCCESSFULLY,
            data: product,
        });
    } catch (error) {
        debug(error);
        res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
}

async function createProduct(req, res) {    
    const errors = validationResult(req);

    // Error handling
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    const {
        name,
        description,
        price,
        quantity,
        brand_id,
        category_id
    } = req.body;

    const payload = {
        product_name: name,
        product_description: description,
        product_price: price,
        product_quantity: quantity ? quantity : 0,
        brand_id: brand_id ? brand_id : null,
        category_id: category_id ? category_id : null,
    }

    try {
        await PRODUCTS_REPO.createProduct(payload);
        return res.json({ message: PRODUCT_CREATED_SUCCESSFULLY });
    } catch (error) {
        debug(error);
        return res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
}

async function updateProduct(req, res) {
    const errors = validationResult(req);

    // Error handling
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    const product_id = req.params.id;
    const condition = { product_id };
    const {
        name,
        description,
        price,
        quantity,
        brand_id,
        category_id
    } = req.body;

    const payload = {
        product_name: name,
        product_description: description,
        product_price: price,
        product_quantity: quantity ? quantity : 0,
        brand_id: brand_id ? brand_id : null,
        category_id: category_id ? category_id : null,
    }

    try {
        await PRODUCTS_REPO.updateProduct(condition, payload);
        return res.json({ message: PRODUCT_UPDATED_SUCCESSFULLY });
    } catch (error) {
        debug(error);
        return res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
}

async function deleteProduct(req, res) {
    const product_id = req.params.id;
    const condition = { product_id };
    const product = await PRODUCTS_REPO.getProduct(condition);

    if (!product) {
        return res.status(404).json({
            message: PRODUCT_NOT_FOUND,
        });
    }

    // Delete product
    PRODUCTS_REPO.deleteProduct(condition);
    return res.json({ message: PRODUCT_DELETED_SUCCESSFULLY });
}