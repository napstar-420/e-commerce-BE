const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');
const controller = require('../controllers/brand');
const { createBrandValidations } = require('../validations/brands');

router.get('/:id', controller.getBrand);

// Below routes require employee authentication
router.use(verifyJWT);
router.use(verifyUser);

router.post('/', ...createBrandValidations, controller.createBrand);
router.post('/:id', ...createBrandValidations, controller.updateBrand);
router.delete('/:id', controller.deleteBrand);

module.exports = router;