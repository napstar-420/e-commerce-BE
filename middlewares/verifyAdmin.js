const config = require('../config');

function verifyAdmin(req, res, next) {
    const { user } = req;

    if (user.role !== config.USER_ROLES.ADMIN) {
        return res.sendStatus(403);
    }

    return next();
}

module.exports = verifyAdmin;