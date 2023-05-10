const express = require("express");
const router = express.Router();
const salesController = require("../controllers/sales.controller");
// Retrieve all saless
router.get("/findAllSales", salesController.findAllSales);
// Create a new sales
router.post("/createSale", salesController.createSale);
// Retrieve a single sales with id
router.get("/findSaleById/:id", salesController.findSaleById);
// Update a sales with id
router.put("/updateSale", salesController.updateSale);
// Delete a sales with id
router.delete("/deleteSale/:id", salesController.deleteSale);
module.exports = router;
