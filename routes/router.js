const router = require('express').Router();
const authRouter = require('./auth');
const brandRouter = require('./brand');
const categoryRouter = require('./category');
const productRouter = require('./product');

// Customer Routes
router.use('/api/auth', authRouter);
router.use('/api/brands', brandRouter);
router.use('/api/categories', categoryRouter);
router.use('/api/products', productRouter);

module.exports = router;