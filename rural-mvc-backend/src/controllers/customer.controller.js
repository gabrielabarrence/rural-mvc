const CustomerModel = require("../models/customer.model");
const hashPass = require("../../config/hash");

class CustomerController {
  constructor() {
    this.customerModel = CustomerModel.defineModel();
  }

  async findAllCustomers(req, res) {
    try {
      const results = await this.customerModel.findAll({
        attributes: ["first_name", "last_name", "email", "is_active"],
      });
      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  async createCustomer(req, res) {
    try {
      const new_customer = req.body;
      new_customer.is_active = true;
      const new_pass = new_customer.password;
      new_customer.password = await hashPass.encryptPassword(new_pass);

      await this.customerModel.create(new_customer, {
        attributes: ["first_name", "last_name", "email", "password"],
      });

      console.log("Usuário criado com sucesso!");
      res.status(200).send("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  async loginCustomer(req, res) {
    try {
      const login_customer = req.body;
      const customerResult = await this.customerModel.findOne({
        where: { email: login_customer.email },
      });
      const decrypted_pass = hashPass.decryptPassword(customerResult.password);
      if (login_customer.password === decrypted_pass) {
        res.status(200).send("Login realizado com sucesso!");
      } else {
        res.status(404).send("Usuário não encontrado. Tente novamente.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  async findById(req, res) {
    try {
      const id_customer = req.params.id;
      const results = await this.customerModel.findByPk(id_customer, {
        attributes: ["first_name", "last_name", "email", "is_active"],
      });
      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  async updateCustomer(req, res) {
    try {
      const update_customer = req.body;
      const results = await this.customerModel.update(update_customer, {
        where: { id_customer: update_customer.id },
      });
      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }

  async setCustomerStatus(req, res) {
    try {
      const id_customer = req.params.id;
      const customer_data = await this.customerModel.findByPk(id_customer);

      let updatedStatus;
      if (customer_data.is_active) {
        updatedStatus = false;
      } else {
        updatedStatus = true;
      }

      const results = await this.customerModel.update(
        { is_active: updatedStatus },
        {
          where: { id_customer: id_customer },
        }
      );

      console.log(results);
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    }
  }
}

module.exports = CustomerController;
