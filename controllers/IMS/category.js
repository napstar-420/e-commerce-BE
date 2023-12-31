const CATEGORY_REPO = require('../../repositories/category');

module.exports = {
    getCategories
}

async function getCategories(req, res) {
    const name = req.query?.name;

    try {
        const categories = await CATEGORY_REPO.getCategories(name);
        return res.json(categories);
    } catch (error) {
        debug(error);
        res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
    }
}