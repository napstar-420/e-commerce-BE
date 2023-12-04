require('dotenv').config();
const debug = require('debug')('myapp:auth_controller');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

        return res.sendStatus(200);
    } catch (error) {
        debug(error);
        return res.sendStatus(500);
    }
}

function userLogin(req, res) {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // Create and Sign a JWT
    const payload = { ...req.user };

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '8h' },
    );

    return res.json({ accessToken });
}

module.exports = {
    userSignup,
    userLogin
}
