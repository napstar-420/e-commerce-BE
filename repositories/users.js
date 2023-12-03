const debug = require('debug')('myapp:user_repo');
const db = require('../database');
const { users } = require('../database/tables');

module.exports = {
    isUserExists,
}

async function isUserExists(payload) {
    try {
        return await db(users).where(payload).select();

    } catch (error) {
        debug(error);
        throw new Error('Error while checking if user exists');
    }
}