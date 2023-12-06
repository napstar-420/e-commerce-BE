const debug = require('debug')('myapp:user_repo');
const db = require('../database');
const { brands } = require('../database/tables');

module.exports = {
    getBrand,
    createBrand,
}

async function getBrand(payload) {
    try {
        return await db(brands).where(payload).select();

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