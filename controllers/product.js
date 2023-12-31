const config = require('../config');
const debug = require('debug')('myapp:products_controller');
const PRODUCTS_REPO = require('../repositories/product');
const { PRODUCT_NOT_FOUND } = require('../lib/responses');
const { SERVER_STATUSES } = config;

module.exports = {
    getProduct,
};

async function getProduct(req, res) {
    const product_id = req.params.id;
    const condition = { product_id };

    try {
        const product = await PRODUCTS_REPO.getProduct(condition);

        // Product not found
        if (!product) {
            return res
                .status(SERVER_STATUSES.NOT_FOUND)
                .json({ message: PRODUCT_NOT_FOUND });
        }

        // Return data
        return res.json(product);
    } catch (error) {
        debug(error);
        res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
}
