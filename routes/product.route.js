const express = require('express');
const Product = require("../models/product.model.js");
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js");

// Define routes
router.get('/', getProducts);
router.get('/:name', getProduct); // Update route to accept name instead of ID
router.post('/', createProduct);
router.put("/:name", updateProduct); // Update route to accept name instead of ID
router.delete("/:name", deleteProduct); // Update route to accept name instead of ID

module.exports = router;