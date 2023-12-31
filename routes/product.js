const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:id', controller.getProduct);

module.exports = router;