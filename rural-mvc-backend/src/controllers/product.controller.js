const productModel = require("../models/product.model");

//controller to find products
const findAllProducts = async (req, res) => {
  await productModel
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

//controller to create products
const createProduct = async (req, res) => {
  const new_product = req.body;
  new_product.in_stock = true;
  new_product.is_reserved = false;

  await productModel
    .create(new_product)
    .then(() => {
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
    .findByPk(id_product, { attributes: ["name", "sale_price", "quantity"] })
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
