const customerModel = require("../models/customer.model");
const hashPass = require("../../config/hash");

//controller to find users
const findAllCustomers = async (req, res) => {
  await customerModel
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
const createCustomer = async (req, res) => {
  const new_customer = req.body;
  new_customer.is_active = true;
  const new_pass = new_customer.password;
  new_customer.password = await hashPass.encryptPassword(new_pass);

  await customerModel
    .create(new_customer, {
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
const loginCustomer = async (req, res) => {
  const login_customer = req.body;
  const customerResult = await customerModel.findOne({
    where: { email: login_customer.email },
  });
  const decrypted_pass = hashPass.decryptPassword(customerResult.password);
  if (login_customer.password === decrypted_pass) {
    res.status(200).send("Login realizado com sucesso!");
  } else {
    res.status(404).send("Usuário não encontrado. Tente novamente.");
  }
};

//controller to find an user by id
const findById = async (req, res) => {
  const id_customer = req.params.id;
  await customerModel
    .findByPk(id_customer, {
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
const updateCustomer = async (req, res) => {
  const update_customer = req.body;
  await customerModel
    .update(update_customer, {
      where: { id_customer: update_customer.id },
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

const setCustomerStatus = async (req, res) => {
  const id_customer = req.params.id;
  const customer_data = await customerModel.findByPk(id_customer);

  if (customer_data.is_active) {
    await customerModel
      .update(
        { is_active: false },
        {
          where: { id_customer: id_customer },
        }
      )
      .then((results) => {
        console.log(results);
        res.status(200).send(results);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Algo deu errado. Tente novamente!");
      });
  } else {
    await customerModel
      .update(
        { is_active: true },
        {
          where: { id_customer: id_customer },
        }
      )
      .then((results) => {
        console.log(results);
        res.status(200).send(results);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Algo deu errado. Tente novamente!");
      });
  }
};

module.exports = {
  findAllCustomers,
  createCustomer,
  findById,
  updateCustomer,
  loginCustomer,
  setCustomerStatus,
};
