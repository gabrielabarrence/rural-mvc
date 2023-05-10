const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
// Retrieve all products
router.get("/findAllProducts", productController.findAllProducts);
// Create a new product
router.post("/createProduct", productController.createProduct);
// Retrieve a single product with id
router.get("/findProductsById/:id", productController.findProductById);
// Update a product with id
router.put("/updateProduct", productController.updateProduct);
// Delete a product with id
router.delete("/deleteProduct/:id", productController.deleteProduct);
module.exports = router;
