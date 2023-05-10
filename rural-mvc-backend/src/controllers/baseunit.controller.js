const baseUnitModel = require("../models/baseunit.model");

//controller to find baseUnits
const findAllBaseUnits = async (req, res) => {
  await baseUnitModel
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

//controller to create baseUnits
const createBaseUnit = async (req, res) => {
  const new_baseUnit = req.body;

  await baseUnitModel
    .create(new_baseUnit)
    .then(() => {
      res.status(200).send("Unidade básica criada com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to delete baseUnits
const deleteBaseUnit = async (req, res) => {
  const id_baseUnit = req.params.id;
  await baseUnitModel
    .destroy({ where: { id_baseUnit: id_baseUnit } })
    .then(() => {
      res.status(200).send("Unidade básica deletada com sucesso!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to find a baseUnit by id
const findBaseUnitById = async (req, res) => {
  const id_baseUnit = req.params.id;
  await baseUnitModel
    .findByPk(id_baseUnit)
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Algo deu errado. Tente novamente!");
    });
};

//controller to update baseUnit
const updateBaseUnit = async (req, res) => {
  const update_baseUnit = req.body;
  await baseUnitModel
    .update(update_baseUnit, { where: { id: update_baseUnit.id } })
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
  findAllBaseUnits,
  createBaseUnit,
  findBaseUnitById,
  updateBaseUnit,
  deleteBaseUnit,
};
