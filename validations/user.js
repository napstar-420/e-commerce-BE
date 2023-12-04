const { body } = require('express-validator');
const { first } = require('lodash');
const USERS_REPO = require('../repositories/users');
const config = require('../config');

const userLoginValidations = [
    body('email')
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1, max: 100 })
        .isEmail()
        .custom(async (value, { req }) => {
            const user = first(await USERS_REPO.isUserExists({ email: value }));
            if (!user) {
                throw new Error('User not found');
            }

            // Add the User ID so we can use it in the controller
            req.user_id = user.user_id;
            req.user_password = user.password;

            return true;
        }),

    body('password')
        .escape()
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.user_password) {
                throw new Error('Incorrect password');
            }

            return true;
        }),
]

const userSignupValidations = [
    body('full_name')
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1, max: 100 }),

    body('email')
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1, max: 100 })
        .isEmail()
        .custom(async value => {
            const user = first(await USERS_REPO.isUserExists({ email: value }));

            if (user) {
                throw new Error('Email already in use');
            }

            return true;
        }),

    body('username')
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1, max: 100 })
        .custom(async value => {
            const user = first(await USERS_REPO.isUserExists({ username: value }));

            if (user) {
                throw new Error('Username already in use');
            }

            return true;
        }),

    body('password')
        .escape()
        .notEmpty()
        .isLength({ min: 1, max: 16 })
        .custom(value => config.PASSWORD_REGEX.test(value))
        .withMessage('Password doesn\'t match requirements'),

    body('role')
        .notEmpty()
        .isIn(Object.values(config.USER_ROLES))
]

module.exports = {
    userLoginValidations,
    userSignupValidations,
}