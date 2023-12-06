const { body } = require("express-validator");
const BRANDS_REPO = require('../repositories/brands');
const debug = require('debug')('myapp:brands_validations');
const {
    BRAND_NAME_IS_REQUIRED,
    BRAND_NAME_LENGTH_ERROR,
    BRAND_DESC_LENGTH_ERROR,
    INVALID_BRAND_NAME,
} = require('../lib/responses');
const { first } = require("lodash");

const brandValidations = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(BRAND_NAME_IS_REQUIRED)
        .isLength({ max: 100 })
        .withMessage(BRAND_NAME_LENGTH_ERROR)
        .custom(async value => {
            try {
                const payload = { brand_name: value };
                const brand = first(await BRANDS_REPO.getBrand(payload));

                if (brand) {
                    throw new Error(INVALID_BRAND_NAME);
                }

                return true;
            } catch (error) {
                debug(error);
                throw new Error(error);
            }
        }),

    body('description')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 1, max: 255 })
        .withMessage(BRAND_DESC_LENGTH_ERROR),
];

module.exports = {
    brandValidations,
}