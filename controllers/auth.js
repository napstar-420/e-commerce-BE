/**
 * All the validations are done before @req reaches
 * This part of authentication :)
 */

function userSignup(req, res) {
    return res.sendStatus(200);
}

function userLogin(req, res) {
    return res.sendStatus(200);
}

function userLogout(req, res) {
    return res.sendStatus(200);
}

module.exports = {
    userSignup,
    userLogin,
    userLogout
}
