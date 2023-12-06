const { validationResult } = require('express-validator');
const BRANDS_REPO = require('../repositories/brands');
const debug = require('debug')('myapp:brands_controller');
const config = require('../config');
const {
    BRAND_CREATED,
} = require('../lib/responses');

const { SERVER_STATUSES } = config;

module.exports = {
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}

function getBrand(req, res) {
    return res.sendStatus(SERVER_STATUSES.OK);
}

async function createBrand(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    // description is optional
    const { name, description } = req.body;
    const payload = {
        brand_name: name,
        brand_description: description ? description : null,
    }

    try {
        await BRANDS_REPO.createBrand(payload);
        return res.json({
            MESSAGE: BRAND_CREATED,
            BRAND: payload,
        })
    } catch (error) {
        debug(error);
        return res.status(SERVER_STATUSES.SERVER_ERROR).json({ error })
    }
}

function updateBrand(req, res) {
    return res.sendStatus(SERVER_STATUSES.OK);
}

function deleteBrand(req, res) {
    return res.sendStatus(SERVER_STATUSES.OK);
}