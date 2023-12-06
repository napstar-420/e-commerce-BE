const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');
const controller = require('../controllers/brands');
const { createBrandValidations } = require('../validations/brands');

// GET
router.get('/:id', controller.getBrand);

// Below routes require employee authentication
router.use(verifyJWT);
router.use(verifyUser);

// POST
router.post('/', ...createBrandValidations, controller.createBrand);
router.post('/:id', ...createBrandValidations, controller.updateBrand);

// DELETE
router.delete('/:id', controller.deleteBrand);

module.exports = router;