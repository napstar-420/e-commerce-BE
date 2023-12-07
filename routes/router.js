const router = require('express').Router();
const authRouter = require('./auth');
const brandRouter = require('./brands');
const categoryRouter = require('./category');

router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/category', categoryRouter);

module.exports = router;