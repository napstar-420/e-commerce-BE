const debug = require('debug')('myapp:products_repo');
const { first } = require('lodash');
const db = require('../database');
const { products } = require('../database/tables');

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getImsProducts
}

async function getProduct(condition) {
    try {
        const data = await db(products).where(condition).select();
        return first(data);
    } catch (error) {
        debug(error);
        throw new Error('Error while fetching product');
    }
}

async function createProduct(payload) {
    try {
        return await db(products).insert(payload);
    } catch (error) {
        debug(error);
        throw new Error('Error while creating product');
    }
}

async function updateProduct(condition, payload) {
    try {
        return await db(products).where(condition).update(payload);
    } catch (error) {
        debug(error);
        throw new Error('Error while updating product');
    }
}

async function deleteProduct(condition) {
    try {
        return await db(products).where(condition).delete();
    } catch (error) {
        debug(error);
        throw new Error('Error while deleting product');
    }
}

async function getImsProducts() {
    try {
        return await db(products).select().limit(10);
    } catch (error) {
        debug(error);
        throw new Error('Error while deleting product');
    }
}