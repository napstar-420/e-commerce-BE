const config = require('../../config');
const debug = require('debug')('myapp:products_controller');
const PRODUCTS_REPO = require('../../repositories/product');
const PRODUCT_IMAGES_REPO = require('../../repositories/productImages');
const { validationResult } = require('express-validator');
const { areImagesAllowed, uploadImage } = require('../../utils');
const {
    PRODUCT_CREATED_SUCCESSFULLY,
    PRODUCT_UPDATED_SUCCESSFULLY,
    PRODUCT_DELETED_SUCCESSFULLY,
    PRODUCT_NOT_FOUND,
    INVALID_IMAGE_FORMAT,
} = require('../../lib/responses');
const { SERVER_STATUSES } = config;

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}

async function getProducts(_, res) {
    try {
        const products = await PRODUCTS_REPO.getImsProducts();
        res.json(products);
    } catch (error) {
        debug(error);
        res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
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
        return res.json(product);
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

    // Images checking
    if (req.files?.length && !areImagesAllowed(req.files)) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json({
            errors: [{ msg: INVALID_IMAGE_FORMAT }]
        });
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
        const [productId] = await PRODUCTS_REPO.createProduct(payload);
        const product = await PRODUCTS_REPO.getProduct({ product_id: productId });

        // Upload images
        if (req.files.length) {
            const imageTasks = req.files.map(image => uploadImage(image, name));
            const uploadImages = await Promise.all(imageTasks);
            const payloadArr = uploadImages.map(image => {
                return {
                    ...image,
                    product_id: productId
                }
            });
            const dbTasks = payloadArr.map(payload => PRODUCT_IMAGES_REPO.addImage(payload))

            await Promise.all(dbTasks);
        }

        return res.json({
            message: PRODUCT_CREATED_SUCCESSFULLY,
            data: product,
        });
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

    // Images checking
    if (req.files?.length && !areImagesAllowed(req.files)) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json({
            errors: [{ msg: INVALID_IMAGE_FORMAT }]
        });
    }

    const productId = req.params.id;
    const condition = { product_id: productId };
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
        // Update product in DB
        await PRODUCTS_REPO.updateProduct(condition, payload);

        // Upload images
        if (req.files.length) {
            const imageTasks = req.files.map(image => uploadImage(image, name));
            const uploadImages = await Promise.all(imageTasks);
            const payloadArr = uploadImages.map(image => {
                return {
                    ...image,
                    product_id: productId
                }
            });
            const dbTasks = payloadArr.map(payload => PRODUCT_IMAGES_REPO.addImage(payload))

            await Promise.all(dbTasks);
        }

        return res.json({ message: PRODUCT_UPDATED_SUCCESSFULLY });
    } catch (error) {
        debug(error);
        return res.status(SERVER_STATUSES.SERVER_ERROR)
            .json({ message: error });
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