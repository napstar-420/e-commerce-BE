const { validationResult } = require('express-validator');
const CATEGORY_REPO = require('../repositories/category');
const debug = require('debug')('myapp:category_controller');
const config = require('../config');
const {
    CATEGORY_NOT_FOUND,
    CATEGORY_FETCHED_SUCCESSFULLY,
    CATEGORY_CREATED_SUCCESSFULLY,
    CATEGORY_UPDATED_SUCCESSFULLY,
    CATEGORY_DELETED_SUCCESSFULLY,
} = require('../lib/responses');

const { SERVER_STATUSES } = config;

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

async function getCategory(req, res) {
    const category_id = req.params.id;
    const category = await CATEGORY_REPO.getCategory({ category_id });

    // Category not found
    if (!category) {
        return res.status(404).json({ message: CATEGORY_NOT_FOUND });
    } 

    return res.json({
        message: CATEGORY_FETCHED_SUCCESSFULLY,
        data: category
    });
}

async function createCategory(req, res) {
    const errors = validationResult(req);

    // Body error handling
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    // description is optional
    const { name } = req.body;
    const payload = { category_name: name }

    // Add Category
    try {
        await CATEGORY_REPO.createCategory(payload);
        return res.json({ message: CATEGORY_CREATED_SUCCESSFULLY })
    } catch (error) {
        debug(error);
        return res.status(SERVER_STATUSES.SERVER_ERROR).json({ error })
    }
}

async function updateCategory(req, res) {
    const errors = validationResult(req);

    // Body Error handling
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    const category_id = req.params.id;
    const condition = { category_id };
    const category = await CATEGORY_REPO.getCategory(condition);

    // Category not found
    if (!category) {
        return res.status(404).json({ message: CATEGORY_NOT_FOUND });
    }

    const { name } = req.body;
    const payload = { category_name: name }

    // Update Category
    await CATEGORY_REPO.updateCategory(condition, payload);
    return res.json({ message: CATEGORY_UPDATED_SUCCESSFULLY });
}

async function deleteCategory(req, res) {
    const category_id = req.params.id;
    const condition = { category_id };
    const category = await CATEGORY_REPO.getCategory(condition);

    // Category not found
    if (!category) {
        return res.status(404).json({ message: CATEGORY_NOT_FOUND });
    } 

    // Delete Category
    await CATEGORY_REPO.deleteCategory(condition);
    return res.json({ message: CATEGORY_DELETED_SUCCESSFULLY });
}