const router = require('express').Router();
const authRouter = require('./auth');

// Auth routes
router.use('/auth', authRouter);

module.exports = router;