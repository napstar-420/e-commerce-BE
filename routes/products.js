const router = require('express').Router();
const controller = require('../controllers/products');

router.get('/:id', controller.getProduct);

module.exports = router;