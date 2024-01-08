const { body, query } = require("express-validator");
const BRANDS_REPO = require('../repositories/brand');
const {
    BRAND_NAME_IS_REQUIRED,
    BRAND_NAME_LENGTH_ERROR,
    BRAND_DESC_LENGTH_ERROR,
    INVALID_BRAND_NAME,
} = require('../lib/responses');

const createBrandValidations = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(BRAND_NAME_IS_REQUIRED)
        .isLength({ max: 100 })
        .withMessage(BRAND_NAME_LENGTH_ERROR)
        .custom(async (value, { req }) => {
            const condition = { brand_name: value };
            const brand = await BRANDS_REPO.getBrand(condition);

            if (brand && brand.brand_id != req.params.id) {
                throw new Error(INVALID_BRAND_NAME);
            }

            return true;
        }),

    body('description')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 1, max: 255 })
        .withMessage(BRAND_DESC_LENGTH_ERROR),
];

module.exports = {
    createBrandValidations,
}