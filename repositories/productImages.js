const debug = require('debug')('myapp:productImages_repo');
const db = require('../database');
const { productImages } = require('../database/tables');
const { IMAGE_INSERT_ERROR } = require('../lib/responses');

module.exports = {
    addImage,
}

async function addImage(payload) {
    try {
        return await db(productImages).insert(payload); 
    } catch (error) {
        debug(error);
        throw new Error(IMAGE_INSERT_ERROR);
    }
}