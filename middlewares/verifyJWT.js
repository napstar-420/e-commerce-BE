require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config');
const { SERVER_STATUSES } = config;

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(SERVER_STATUSES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(SERVER_STATUSES.FORBIDDEN);
            }

            req.user = { ...decoded };
            return next();
        },
    );
}

module.exports = verifyJWT;