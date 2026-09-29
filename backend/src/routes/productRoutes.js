const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const leadController = require('../controllers/leadController');

router.get('/products', productController.getProducts);
router.get('/products/:slug', productController.getProductBySlug);
router.get('/stats', leadController.getStats);

module.exports = router;
