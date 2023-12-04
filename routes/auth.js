const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyAdmin = require('../middlewares/verifyAdmin');
const { userLogin, userSignup } = authController;
const { userLoginValidations, userSignupValidations } = require('../validations/user');

router.post('/user/login', ...userLoginValidations, userLogin);

// Below routes require authentication
router.use(verifyJWT);

// Below routes require Admin authentication
router.use(verifyAdmin);
router.post('/user/signup', ...userSignupValidations, userSignup);

module.exports = router;