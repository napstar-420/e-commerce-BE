const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');
const router = require('express').Router();
const authRouter = require('./auth');
const brandRouter = require('./brand');
const categoryRouter = require('./category');
const productRouter = require('./product');
const imsProductRouter = require('./IMS/product');
const imsBrandRouter = require('./IMS/brand');
const imsCategoryRouter = require('./IMS/category');

// Customer Routes
router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/category', categoryRouter);
router.use('/products', productRouter);

// IMS Routes
router.use(verifyJWT);
router.use(verifyUser);

router.use('/ims/products', imsProductRouter);
router.use('/ims/brands', imsBrandRouter);
router.use('/ims/categories', imsCategoryRouter);

module.exports = router;