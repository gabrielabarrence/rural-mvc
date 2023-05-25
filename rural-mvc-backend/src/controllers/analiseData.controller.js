const productModel = require("../models/product.model");
const baseUnitModel = require("../models/baseunit.model");
const customerModel = require("../models/customer.model");

// quantidade total de produtos por categoria de unidade de medida

const getProductsPerBaseUnit = async (req, res) => {
  await productModel
    .findAll({ include: baseUnitModel })
    .then((results) => {
      const groupByBaseUnit = results.reduce((group, product) => {
        const { unit_type } = product.baseUnit;
        group[unit_type] = group[unit_type] ?? [];
        group[unit_type].push(product);
        return group;
      }, {});
      res.status(200).send(groupByBaseUnit);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

// quantidade total de clientes cadastrados por mês
const getClientsPerMonth = async (req, res) => {
  await customerModel
    .findAll({ attributes: ["id_customer", "first_name", "createdAt"] })
    .then((results) => {
      console.log(results);

      const months = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      results.forEach((result) => {
        months[new Date(result.createdAt).getMonth()] += 1; //percorremos o array de usuarios e pegamos o mes da variavel createdAt
      });
      //transforming object in array to filter and leave the months with no data
      res.status(200).send(
        Object.keys(months)
          .map((key) => [months[key]])
          .flat(1)
          .filter((filterMonths) => filterMonths > 0)
      );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

module.exports = { getProductsPerBaseUnit, getClientsPerMonth };
