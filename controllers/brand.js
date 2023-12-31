const { validationResult } = require('express-validator');
const BRANDS_REPO = require('../repositories/brand');
const debug = require('debug')('myapp:brands_controller');
const config = require('../config');
const {
    BRAND_NOT_FOUND,
    BRAND_FETCHED_SUCCESSFULLY,
    BRAND_CREATED_SUCCESSFULLY,
    BRAND_UPDATED_SUCCESSFULLY,
    BRAND_DELETED_SUCCESSFULLY,
} = require('../lib/responses');

const { SERVER_STATUSES } = config;

module.exports = {
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}

async function getBrand(req, res) {
    const brand_id = req.params.id;
    const brand = await BRANDS_REPO.getBrand({ brand_id });

    // Brand not found
    if (!brand) {
        return res.status(404).json({ message: BRAND_NOT_FOUND });
    } 

    return res.json({
        message: BRAND_FETCHED_SUCCESSFULLY,
        data: brand,
    });
}

async function createBrand(req, res) {
    const errors = validationResult(req);

    // Body error handling
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    // description is optional
    const { name, description } = req.body;
    const payload = {
        brand_name: name,
        brand_description: description ? description : null,
    }

    // Add brand
    try {
        await BRANDS_REPO.createBrand(payload);
        return res.json({ message: BRAND_CREATED_SUCCESSFULLY })
    } catch (error) {
        debug(error);
        return res.status(SERVER_STATUSES.SERVER_ERROR).json({ error })
    }
}

async function updateBrand(req, res) {
    const errors = validationResult(req);

    // Body Error handling
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    const brand_id = req.params.id;
    const condition = { brand_id };
    const brand = await BRANDS_REPO.getBrand(condition);

    // Brand not found
    if (!brand) {
        return res.status(404).json({ message: BRAND_NOT_FOUND });
    }

    const { name, description } = req.body;
    const payload = {
        brand_name: name,
        brand_description: description ? description : null,
    }

    // Update Brand
    await BRANDS_REPO.updateBrand(condition, payload);
    return res.json({ message: BRAND_UPDATED_SUCCESSFULLY });
}

async function deleteBrand(req, res) {
    const brand_id = req.params.id;
    const condition = { brand_id };
    const brand = await BRANDS_REPO.getBrand(condition);

    // Brand not found
    if (!brand) {
        return res.status(404).json({ message: BRAND_NOT_FOUND });
    } 

    // Delete brand
    await BRANDS_REPO.deleteBrand(condition);
    return res.json({ message: BRAND_DELETED_SUCCESSFULLY });
}