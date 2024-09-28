const { Router } = require('express');
const router = Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/form/create', categoriesController.getCategoryForm);
router.post("/create", categoriesController.createCategory)
router.get('/', categoriesController.getCategories);

module.exports = router;