const debug = require('debug')('myapp:user_repo');
const db = require('../database');
const { users } = require('../database/tables');

module.exports = {
    isUserExists,
    createUser,
}

async function isUserExists(payload) {
    try {
        return await db(users).where(payload).select();

    } catch (error) {
        debug(error);
        throw new Error('Error while checking if user exists');
    }
}

async function createUser(payload) {
    try {
        return await db(users).insert(payload);
    } catch (error) {
        debug(error);
        throw new Error("Error while creating user");
    }
}