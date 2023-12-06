const config = require('../config');
const { SERVER_STATUSES } = config;

function verifyUser(req, res, next) {
    const { user } = req;
    const isUserAllowed = Object.values(config.USER_ROLES).includes(user.role);

    if (!isUserAllowed) {
        return res.sendStatus(SERVER_STATUSES.UNAUTHORIZED);
    }

    return next();
}

module.exports = verifyUser;