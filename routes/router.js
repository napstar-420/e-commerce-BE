const router = require('express').Router();
const authRouter = require('./auth');
const brandRouter = require('./brands');

// Auth routes
router.use('/auth', authRouter);

// Brands routes
router.use('/brands', brandRouter);

module.exports = router;