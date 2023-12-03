const debug = require('debug')('myapp:user_validations');
const { body, validationResult } = require('express-validator');
const USERS_REPO = require('../repositories/users');
const { first, isEmpty } = require('lodash');

const userLoginValidations = [
    // Body Validations
    body('email')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Email is required')
        .isLength({ min: 1, max: 100 })
        .withMessage('Email should be less than or equal to 100 characters')
        .isEmail()
        .withMessage('Email is not valid'),

    body('password')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Password is required'),

    // Check if any field is incorrect or missing
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw res.status(400).json(errors);
        }

        return next();
    },

    // Check if user exists in DB
    async (req, res, next) => {
        const { email, password } = req.body;
        const payload = { email };

        try {
            const users = await USERS_REPO.isUserExists(payload);

            if (isEmpty(users)) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = first(users);

            if (user.password !== password) {
                return res.status(403).json({
                    message: "Incorrect Password"
                });
            }

            // Add the User ID so we can use it in the controller
            req.user_id = user.user_id;
            return next();
        } catch (error) {
            debug(error);
            throw res.sendStatus(500).json(error);
        }
    }
]

module.exports = {
    userLoginValidations
}