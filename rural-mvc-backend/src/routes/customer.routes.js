const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
// Retrieve all customers
router.get("/findAllCustomers", customerController.findAllCustomers);
// Create a new customer
router.post("/createCustomer", customerController.createCustomer);
// Retrieve a single customer with id
router.get("/findById/:id", customerController.findById);
// Update a customer with id
router.put("/updateCustomer", customerController.updateCustomer);

router.put("/updateCustomerStatus/:id", customerController.setCustomerStatus);
// Login the customer
router.post("/loginCustomer", customerController.loginCustomer);
module.exports = router;
