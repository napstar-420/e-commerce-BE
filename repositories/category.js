const debug = require('debug')('myapp:user_repo');
const { first } = require('lodash');
const db = require('../database');
const { categories } = require('../database/tables');

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

async function getCategory(condition) {
    try {
        const data = await db(categories).where(condition).select();
        return first(data);
    } catch (error) {
        debug(error);
        throw new Error('Error while checking if category exists');
    }
}

async function createCategory(payload) {
    try {
        return await db(categories).insert(payload);
    } catch (error) {
        debug(error);
        throw new Error("Error while creating category");
    }
}

async function updateCategory(condition, payload) {
    try {
        return await db(categories).where(condition).update(payload)
    } catch (error) {
        debug(error);
        throw new Error('Error while updating category');
    }
}

async function deleteCategory(condition) {
    try {
        return await db(categories).where(condition).delete();
    } catch (error) {
        debug(error);
        throw new Error('Error while deleting category');
    }
}