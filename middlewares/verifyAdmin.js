const config = require('../config');
const { SERVER_STATUSES, USER_ROLES } = config;

function verifyAdmin(req, res, next) {
    const { user } = req;

    if (user.role !== USER_ROLES.ADMIN) {
        return res.sendStatus(SERVER_STATUSES.FORBIDDEN);
    }

    return next();
}

module.exports = verifyAdmin;