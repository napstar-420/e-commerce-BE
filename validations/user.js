const { body } = require('express-validator');
const { first, isEmpty } = require('lodash');
const bcrypt = require('bcryptjs');
const USERS_REPO = require('../repositories/user');
const config = require('../config');
const {
    EMAIL_IS_REQUIRED,
    EMAIL_LENGTH_ERROR,
    USER_NOT_FOUND,
    PASSWORD_IS_REQUIRED,
    INCORRECT_PASSWORD,
    INVALID_EMAIL,
    NAME_IS_REQUIRED,
    NAME_LENGTH_ERROR,
    EMAIL_OCCUPIED,
    USERNAME_IS_REQUIRED,
    USERNAME_LENGTH_ERROR,
    USERNAME_OCCUPIED,
    INVALID_PASSWORD,
    INVALID_ROLE
} = require('../lib/responses');

const userLoginValidations = [
    body('email')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(EMAIL_IS_REQUIRED)
        .isLength({ min: 1, max: 100 })
        .withMessage(EMAIL_LENGTH_ERROR)
        .isEmail()
        .withMessage(INVALID_EMAIL)
        .custom(async (value, { req }) => {
            const user = await USERS_REPO.getUser({ email: value });

            if (!user) {
                throw new Error(USER_NOT_FOUND);
            }

            // Add the User Data so we can use it later
            req.user = { ...user }
            return true;
        }),

    body('password')
        .escape()
        .notEmpty()
        .withMessage(PASSWORD_IS_REQUIRED)
        .custom(async (value, { req }) => {
            /**
             * When account is not found
             */
            if (isEmpty(req.user)) {
                throw new Error(INCORRECT_PASSWORD);
            }

            const match_result = await bcrypt.compare(value, req.user.password); 

            if (!match_result) {
                throw new Error(INCORRECT_PASSWORD);
            }

            return true;
        }),
]

const userSignupValidations = [
    body('full_name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(NAME_IS_REQUIRED)
        .isLength({ min: 1, max: 100 })
        .withMessage(NAME_LENGTH_ERROR),

    body('email')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(EMAIL_IS_REQUIRED)
        .isLength({ min: 1, max: 100 })
        .withMessage(EMAIL_LENGTH_ERROR)
        .isEmail()
        .withMessage(INVALID_EMAIL)
        .custom(async value => {
            const user = first(await USERS_REPO.getUser({ email: value }));

            if (user) {
                throw new Error(EMAIL_OCCUPIED);
            }

            return true;
        }),

    body('username')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(USERNAME_IS_REQUIRED)
        .isLength({ min: 1, max: 100 })
        .withMessage(USERNAME_LENGTH_ERROR)
        .custom(async value => {
            const user = await USERS_REPO.getUser({ username: value });

            if (user) {
                throw new Error(USERNAME_OCCUPIED);
            }

            return true;
        }),

    body('password')
        .escape()
        .notEmpty()
        .withMessage(PASSWORD_IS_REQUIRED)
        .isLength({ min: 1, max: 16 })
        .withMessage(INVALID_PASSWORD)
        .custom(value => config.PASSWORD_REGEX.test(value))
        .withMessage(INVALID_PASSWORD),

    body('role')
        .optional()
        .isIn(Object.values(config.USER_ROLES))
        .withMessage(INVALID_ROLE),
]

module.exports = {
    userLoginValidations,
    userSignupValidations,
}