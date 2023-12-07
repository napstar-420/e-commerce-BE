const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');
const controller = require('../controllers/products');
const { productValidations } = require('../validations/products');

router.get('/:id', controller.getProduct);

// Below routes require authentication
router.use(verifyJWT);
router.use(verifyUser);

router.post('/', ...productValidations, controller.createProduct);
router.post('/:id', ...productValidations, controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;