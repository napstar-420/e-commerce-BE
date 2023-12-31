const router = require('express').Router();
const controller = require('../../controllers/IMS/brand');
const { getBrandsValidations } = require('../../validations/brands');

router.get('/', ...getBrandsValidations, controller.getBrands);

module.exports = router;