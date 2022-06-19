const express = require("express");
const { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct, getAdminProducts } = require("../controllers/productController");
const { isAuthenticated } = require('../middleware/auth');

const router=express.Router();
// using router making routes

router.route('/products/new').post(isAuthenticated,createProduct);
router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);
router.route('/admin/products').get(isAuthenticated,getAdminProducts);
router.route('/product/:id').put(isAuthenticated,updateProduct);
router.route('/product/:id').delete(deleteProduct);

module.exports=router;