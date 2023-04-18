const express = require("express");
const router = express.Router();
const baseunitController = require("../controllers/baseunit.controller");
// Retrieve all baseUnits
router.get("/findAllBaseUnit", baseunitController.findAllBaseUnits);
// Create a new baseUnit
router.post("/createBaseUnit", baseunitController.createBaseUnit);
// Retrieve a single baseUnit with id
router.get("/findBaseUnitById/:id", baseunitController.findBaseUnitById);
// Update a baseUnit with id
router.put("/updateBaseUnit", baseunitController.updateBaseUnit);
// Delete a baseUnit with id
router.delete("deleteBaseUnit/:id", baseunitController.deleteBaseUnit);
module.exports = router;
