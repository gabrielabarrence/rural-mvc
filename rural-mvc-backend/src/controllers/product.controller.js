const productModel = require("../models/product.model");
const stockModel = require("../models/stock.model");

//controller to find products
const findAllProducts = async (req, res) => {
  await productModel
    .findAll({ include: stockModel })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to create products and stock
const createProduct = async (req, res) => {
  const new_product = req.body;

  const new_stock = { quantity: new_product.quantity };
  new_stock.in_stock = true;
  new_stock.quantity_reserved = 0;

  await stockModel
    .create(new_stock)
    .then(async (response) => {
      new_product.id_stock = response.dataValues.id_stock;
      await productModel
        .create(new_product)
        .then(() => {
          console.log("Produto criado com sucesso!");
        })
        .catch((error) => {
          console.log(error);
        });
      res.status(200).send("Produto criado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to delete products
const deleteProduct = async (req, res) => {
  const id_product = req.params.id;
  await productModel
    .destroy({ where: { id_product: id_product } })
    .then(() => {
      res.status(200).send("Produto deletado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to find a product by id
const findProductById = async (req, res) => {
  const id_product = req.params.id;
  await productModel
    .findByPk(id_product, { attributes: ["name", "sale_price"] })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to update product
const updateProduct = async (req, res) => {
  const update_product = req.body;
  await productModel
    .update(update_product, { where: { id: update_product.id } })
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
  findAllProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
};
