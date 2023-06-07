const express = require("express");
const producerController = require("../controllers/producer.controller");

class ProducerRouter {
  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get("/findAllProducers", producerController.findAllProducers);
    this.router.post("/createProducer", producerController.createProducer);
    this.router.get(
      "/findProducerById/:id",
      producerController.findProducerById
    );
    this.router.put("/updateProducer", producerController.updateProducer);
    this.router.delete(
      "/deleteProducer/:id",
      producerController.deleteProducer
    );
    this.router.post("/loginProducer", producerController.loginProducer);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ProducerRouter().getRouter();

const express = require("express");
const producerController = require("../controllers/producer.controller");

const router = express.Router();
const customerController = new CustomerController();

router.get(
  "/findAllProducers",
  producerController.findAllProducers.bind(producerController)
);
router.post(
  "/createProducer",
  producerController.createProducer.bind(producerController)
);
router.get(
  "/findProducerById/:id",
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
