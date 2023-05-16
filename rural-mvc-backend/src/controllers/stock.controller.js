const stockModel = require("../models/stock.model");
const productModel = require("../models/product.model");
const sequelize = require("../../config/db.config");

//controller to create new stock
const createStock = async (req, res) => {
  const new_stock = req.body;
  new_stock.in_stock = true;
  new_stock.quantity_reserved = 0;

  await stockModel
    .create(new_stock)
    .then(() => {
      res.status(200).send("Estoque criado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to increment reserved products
const manageStock = async (req, res) => {
  const id_product = req.params.id;
  await productModel
    .findByPk(id_product, { include: stockModel })
    .then(async (results) => {
      if (results.stock.quantity_reserved < results.stock.quantity) {
        await stockModel
          .update(
            { quantity_reserved: sequelize.literal("quantity_reserved+1") },
            { where: { id_stock: results.stock.id_stock } }
          )
          .then(async () => {
            await productModel
              .findByPk(id_product, { include: stockModel })
              .then(async (results) => {
                if (
                  results.stock.quantity_reserved === results.stock.quantity
                ) {
                  await stockModel.update(
                    { in_stock: false },
                    { where: { id_stock: results.stock.id_stock } }
                  );
                }
              });
          });
      }
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

module.exports = {
  createStock,
  manageStock,
};
