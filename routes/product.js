const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/temp' });
const controller = require('../controllers/product');
const { productValidations } = require('../validations/products');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);

// Below routes require employee authentication
router.use(verifyJWT);
router.use(verifyUser);

router.post(
    '/',
    upload.array('images', 12),
    ...productValidations,
    controller.createProduct
);
router.post(
    '/:id',
    upload.array('images', 12),
    ...productValidations,
    controller.updateProduct
);
router.delete('/:id', controller.deleteProduct);

module.exports = router;