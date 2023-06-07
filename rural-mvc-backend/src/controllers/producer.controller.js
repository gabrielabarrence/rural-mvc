const producerModel = require("../models/producer.model");
const hashPass = require("../../config/hash");

class ProducerController {
  static async findAllProducers(req, res) {
    try {
      const results = await producerModel.findAll({
        attributes: ["first_name", "last_name", "email", "is_active"],
      });
      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  static async createProducer(req, res) {
    try {
      const newProducer = req.body;
      newProducer.is_active = true;
      const newPass = newProducer.password;
      newProducer.password = await hashPass.encryptPassword(newPass);

      await producerModel.create(newProducer, {
        attributes: ["first_name", "last_name", "email", "password"],
      });

      console.log("Usuário criado com sucesso!");
      res.status(200).send("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  static async loginProducer(req, res) {
    try {
      const loginProducer = req.body;
      const producerResult = await producerModel.findOne({
        where: { email: loginProducer.email },
      });

      const decryptedPass = hashPass.decryptPassword(producerResult.password);
      if (loginProducer.password === decryptedPass) {
        res.status(200).send("Login realizado com sucesso!");
      } else {
        res.status(404).send("Usuário não encontrado. Tente novamente.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  static async deleteProducer(req, res) {
    try {
      const idProducer = req.params.id;
      await producerModel.destroy({ where: { id_producer: idProducer } });

      console.log("Usuário deletado com sucesso!");
      res.status(200).send("Usuário deletado com sucesso!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  static async findProducerById(req, res) {
    try {
      const idProducer = req.params.id;
      const results = await producerModel.findByPk(idProducer, {
        attributes: ["first_name", "last_name", "email", "is_active"],
      });

      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  static async updateProducer(req, res) {
    try {
      const updateProducer = req.body;
      const results = await producerModel.update(updateProducer, {
        where: { id: updateProducer.id },
      });

      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }
}

module.exports = ProducerController;
