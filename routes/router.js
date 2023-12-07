const router = require('express').Router();
const authRouter = require('./auth');
const brandRouter = require('./brands');
const categoryRouter = require('./category');
const productRouter = require('./products');

router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/category', categoryRouter);
router.use('/products', productRouter);

module.exports = router;