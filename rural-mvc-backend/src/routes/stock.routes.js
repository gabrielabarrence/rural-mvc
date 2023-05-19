const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

// Create a new stock
router.post("/createStock", stockController.createStock);

// Manage stock
router.post("/manageStock/:id", stockController.manageStock);
module.exports = router;

// Manage stock
router.post("/sendEmail", stockController.sendEmail);
module.exports = router;
