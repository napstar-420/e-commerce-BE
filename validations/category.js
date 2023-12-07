const { body } = require("express-validator");
const CATEGORY_REPO = require('../repositories/category');
const {
    CATEGORY_NAME_IS_REQUIRED,
    CATEGORY_NAME_LENGTH_ERROR,
    CATEGORY_ALREADY_EXISTS
} = require('../lib/responses');

const createCategoryValidations = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage(CATEGORY_NAME_IS_REQUIRED)
        .isLength({ max: 100 })
        .withMessage(CATEGORY_NAME_LENGTH_ERROR)
        .custom(async (value, { req }) => {
            const condition = { category_name: value };
            const category = await CATEGORY_REPO.getCategory(condition);

            if (category) {
                throw new Error(CATEGORY_ALREADY_EXISTS);
            }

            return true;
        }),
];

module.exports = {
    createCategoryValidations
}