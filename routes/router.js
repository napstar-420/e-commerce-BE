const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');
const router = require('express').Router();
const authRouter = require('./auth');
const brandRouter = require('./brands');
const categoryRouter = require('./category');
const productRouter = require('./products');
const imsProductRouter = require('./IMS/products');
const imsBrandRouter = require('./IMS/brand');

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

module.exports = router;