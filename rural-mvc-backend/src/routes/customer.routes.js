const express = require("express");
const CustomerController = require("../controllers/customer.controller");

const router = express.Router();
const customerController = new CustomerController();

router.get(
  "/findAllCustomers",
  customerController.findAllCustomers.bind(customerController)
);
router.post(
  "/createCustomer",
  customerController.createCustomer.bind(customerController)
);
router.get(
  "/findById/:id",
  customerController.findById.bind(customerController)
);
router.put(
  "/updateCustomer",
  customerController.updateCustomer.bind(customerController)
);
router.put(
  "/updateCustomerStatus/:id",
  customerController.setCustomerStatus.bind(customerController)
);
router.post(
  "/loginCustomer",
  customerController.loginCustomer.bind(customerController)
);

module.exports = router;
