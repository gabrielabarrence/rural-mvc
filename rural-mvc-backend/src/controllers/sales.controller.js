const saleModel = require("../models/sales.model");

//controller to find sales
const findAllSales = async (req, res) => {
  await saleModel
    .findAll()
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to create sales
const createSale = async (req, res) => {
  const new_sale = req.body;

  await saleModel
    .create(new_sale)
    .then(() => {
      res.status(200).send("Venda criada com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to delete sales
const deleteSale = async (req, res) => {
  const id_sale = req.params.id;
  await saleModel
    .delete(id_sale)
    .then(() => {
      res.status(200).send("Venda deletada com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to find a sale by id
const findSaleById = async (req, res) => {
  const id_sale = req.params.id;
  await saleModel
    .findByPk(id_sale)
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to update sale
const updateSale = async (req, res) => {
  const update_sale = req.body;
  await saleModel
    .update(update_sale, { where: { id: update_sale.id } })
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
  findAllSales,
  createSale,
  findSaleById,
  updateSale,
  deleteSale,
};
