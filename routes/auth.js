const router = require('express').Router();
const authController = require('../controllers/auth');
const { userLoginValidations } = require('../validations/user');

const { userLogin, userSignup, userLogout } = authController;

// Get Routes
router.get('/user/logout', userLogout);

// Post Routes
router.post('/user/signup', userSignup);
router.post('/user/login', ...userLoginValidations, userLogin);

module.exports = router;