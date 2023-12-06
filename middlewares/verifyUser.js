const config = require('../config');

function verifyUser(req, res, next) {
    const { user } = req;
    const isUserAllowed = Object.values(config.USER_ROLES).includes(user.role);

    if (!isUserAllowed) {
        return res.sendStatus(403);
    }

    return next();
}

module.exports = verifyUser;