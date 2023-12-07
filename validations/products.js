const { body } = require('express-validator');
const {
    PRODUCT_NAME_IS_REQUIRED,
    PRODUCT_NAME_LENGTH_ERROR,
    PRODUCT_DESC_LENGTH_ERROR,
    PRODUCT_PRICE_IS_REQUIRED,
    INVALID_PRODUCT_PRICE,
    INVALID_PRODUCT_QUANTITY,
    INVALID_BRAND_ID,
    INVALID_CATEGORY_ID
} = require('../lib/responses');

const productValidations = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(PRODUCT_NAME_IS_REQUIRED)
        .isLength({ max: 255 })
        .withMessage(PRODUCT_NAME_LENGTH_ERROR),

    body('description')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 1, max: 255 })
        .withMessage(PRODUCT_DESC_LENGTH_ERROR),

    body('price')
        .trim()
        .notEmpty()
        .withMessage(PRODUCT_PRICE_IS_REQUIRED)
        .isFloat({ min: 1, max: 9999999999.99 })
        .withMessage(INVALID_PRODUCT_PRICE),

    body('quantity')
        .optional()
        .trim()
        .isInt({ min: 0 })
        .withMessage(INVALID_PRODUCT_QUANTITY),

    body('brand_id')
        .optional()
        .trim()
        .isInt({ min: 1 })
        .withMessage(INVALID_BRAND_ID),

    body('category_id')
        .optional()
        .trim()
        .isInt({ min: 1 })
        .withMessage(INVALID_CATEGORY_ID),
];

module.exports = {
    productValidations
};