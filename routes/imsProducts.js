const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/temp' });
const controller = require('../controllers/imsProducts');
const { productValidations } = require('../validations/products');

router.get('/', controller.getProducts)
router.get('/:id', controller.getProduct);

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