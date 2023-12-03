const router = require('express').Router();
const { userLoginValidations } = require('../validations/user');
const authController = require('../controllers/auth');
const verifyJWT = require('../middlewares/verifyJWT');
const { userLogin, userSignup } = authController;

router.post('/user/login', ...userLoginValidations, userLogin);

// Below routes require authentication
router.use(verifyJWT);
router.post('/user/signup', userSignup);

module.exports = router;