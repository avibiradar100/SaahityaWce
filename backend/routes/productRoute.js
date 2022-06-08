const express = require("express");
const { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthenticated } = require('../middleware/auth');

const router=express.Router();
// using router making routes

router.route('/products/new').post(isAuthenticated,createProduct);
router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);

router.route('/product/:id').put(isAuthenticated,updateProduct);
router.route('/product/:id').delete(isAuthenticated,deleteProduct);

module.exports=router;