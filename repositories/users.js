const debug = require('debug')('myapp:user_repo');
const { first } = require('lodash');
const { users } = require('../database/tables');
const db = require('../database');

module.exports = {
    getUser,
    createUser,
}

async function getUser(condition) {
    try {
        const users = await db(users).where(condition).select();
        return first(users);
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