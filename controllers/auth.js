require('dotenv').config();
const jwt = require('jsonwebtoken');

function userSignup(req, res) {
    return res.sendStatus(200);
}

function userLogin(req, res) {
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
