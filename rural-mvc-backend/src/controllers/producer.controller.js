const producerModel = require("../models/producer.model");
const hashPass = require("../../config/hash");

//controller to find users
const findAllProducers = async (req, res) => {
  await producerModel
    .findAll({ attributes: ["first_name", "last_name", "email", "is_active"] })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to create users
const createProducer = async (req, res) => {
  const new_producer = req.body;
  new_producer.is_active = true;
  const new_pass = new_producer.password;
  new_producer.password = await hashPass.encryptPassword(new_pass);

  await producerModel
    .create(new_producer, {
      attributes: ["first_name", "last_name", "email", "password"],
    })
    .then(() => {
      console.log("Usuário criado com sucesso!");
      res.status(200).send("Usuário criado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to login user
const loginProducer = async (req, res) => {
  const login_producer = req.body;
  const producerResult = await producerModel.findOne({
    where: { email: login_producer.email },
  });
  const decrypted_pass = hashPass.decryptPassword(producerResult.password);
  if (login_producer.password === decrypted_pass) {
    res.status(200).send("Login realizado com sucesso!");
  } else {
    res.status(404).send("Usuário não encontrado. Tente novamente.");
  }
};

//controller to delete users
const deleteProducer = async (req, res) => {
  const id_producer = req.params.id;
  await producerModel
    .destroy({ where: { id_producer: id_producer } })
    .then(() => {
      console.log("Usuário deletado com sucesso!");
      res.status(200).send("Usuário deletado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to find an user by id
const findProducerById = async (req, res) => {
  const id_producer = req.params.id;
  await producerModel
    .findByPk(id_producer, {
      attributes: ["first_name", "last_name", "email", "is_active"],
    })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to update user
const updateProducer = async (req, res) => {
  const update_producer = req.body;
  await producerModel
    .update(update_producer, { where: { id: update_producer.id } })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

module.exports = {
  findAllProducers,
  createProducer,
  findProducerById,
  updateProducer,
  deleteProducer,
  loginProducer,
};
