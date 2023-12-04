require('dotenv').config();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

function userSignup(req, res) {
    return res.sendStatus(200);
}

function userLogin(req, res) {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw res.status(400).json(errors);
    }

    // Create and Sign a JWT
    const payload = { id: req.user_id };
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
