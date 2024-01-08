const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT');
const verifyUser = require('../middlewares/verifyUser');
const controller = require('../controllers/category');
const { createCategoryValidations } = require('../validations/category');

router.get('/', controller.getCategories);
router.get('/:id', controller.getCategory);

// Below routes require employee authentication
router.use(verifyJWT);
router.use(verifyUser);

router.post('/', ...createCategoryValidations, controller.createCategory);
router.post('/:id', ...createCategoryValidations, controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;