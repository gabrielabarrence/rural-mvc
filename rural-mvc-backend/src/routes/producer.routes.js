const express = require("express");
const router = express.Router();
const producerController = require("../controllers/producer.controller");
// Retrieve all producers
router.get("/findAllProducers", producerController.findAllProducers);
// Create a new producer
router.post("/createProducer", producerController.createProducer);
// Retrieve a single producer with id
router.get("/findProducerById/:id", producerController.findProducerById);
// Update a producer with id
router.put("/updateProducer", producerController.updateProducer);
// Delete a producer with id
router.delete("deleteProducer/:id", producerController.deleteProducer);
// Login the producer
router.post("/loginProducer", producerController.loginProducer);
module.exports = router;
