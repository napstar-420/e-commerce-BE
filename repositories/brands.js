const debug = require('debug')('myapp:user_repo');
const { first } = require('lodash');
const db = require('../database');
const { brands } = require('../database/tables');

module.exports = {
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
}

async function getBrand(condition) {
    try {
        const data = await db(brands).where(condition).select();
        return first(data);
    } catch (error) {
        debug(error);
        throw new Error('Error while checking if brand exists');
    }
}

async function createBrand(payload) {
    try {
        return await db(brands).insert(payload);
    } catch (error) {
        debug(error);
        throw new Error("Error while creating brand");
    }
}

async function updateBrand(condition, payload) {
    try {
        return await db(brands).where(condition).update(payload)
    } catch (error) {
        debug(error);
        throw new Error('Error while updating brand');
    }
}

async function deleteBrand(condition) {
    try {
        return await db(brands).where(condition).delete();
    } catch (error) {
        debug(error);
        throw new Error('Error while deleting brand');
    }
}