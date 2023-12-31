const router = require('express').Router();
const controller = require('../../controllers/IMS/category');

router.get('/', controller.getCategories);

module.exports = router;