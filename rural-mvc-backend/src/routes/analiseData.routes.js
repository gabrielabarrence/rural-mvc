const express = require("express");
const router = express.Router();
const analiseDataController = require("../controllers/analiseData.controller");
// Route to analise data

router.get(
  "/getProductsPerBaseUnit",
  analiseDataController.getProductsPerBaseUnit
);

router.get("/getClientsPerMonth", analiseDataController.getClientsPerMonth);

module.exports = router;
