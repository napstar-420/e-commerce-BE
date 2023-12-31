const debug = require('debug')('myapp:brands_repo');
const { first } = require('lodash');
const db = require('../database');
const { brands } = require('../database/tables');

module.exports = {
    getBrand,
    getBrands,
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
        throw new Error('Error while getting brand');
    }
}

async function getBrands(name) {
    try {
        if (name) {
            return await db(brands).whereILike('brand_name', `%${name}%`).select();
        }

        return await db(brands).select();
    } catch (error) {
        debug(error);
        throw new Error('Error while getting brands');
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