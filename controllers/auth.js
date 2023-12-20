require('dotenv').config();
const debug = require('debug')('myapp:auth_controller');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const { USER_CREATED } = require('../lib/responses');
const { omit } = require('lodash');
const { SERVER_STATUSES } = config;

async function userSignup(req, res) {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    /**
     * Don't pass all the body data for security purposes
     */
    const {
        full_name,
        email,
        username,
        password,
        role
    } = req.body;

    const payload = {
        full_name,
        email,
        username,
        role,
    };

    try {
        // Hash password
        payload.password = await bcrypt.hash(password, 10);

        // Save user in DB
        await USER_REPO.createUser(payload);
        return res.JSON({ message: USER_CREATED });
    } catch (error) {
        debug(error);
        return res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
}

function userLogin(req, res) {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(SERVER_STATUSES.BAD_REQUEST).json(errors);
    }

    // Create and Sign a JWT
    const user = omit(req.user, ['password']);
    const payload = { ...user };

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '8h' },
    );

    return res.json({ accessToken, user });
}

module.exports = {
    userSignup,
    userLogin
}
