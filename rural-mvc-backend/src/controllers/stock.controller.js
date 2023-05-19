const stockModel = require("../models/stock.model");
const productModel = require("../models/product.model");
const sequelize = require("../../config/db.config");
const nodemailer = require("nodemailer");

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

// controller to send notification email
const sendEmail = async (req, res) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "kane27@ethereal.email", // generated ethereal user
      pass: "Qvmmsw1sgfTywdTSCx", // generated ethereal password
    },
  });
  console.log(req.body.email);
  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: "kane27@ethereal.email", // sender address
      to: req.body.email, // list of receivers
      subject: "Novo Produto no Estoque!", // Subject line
      text: "Olá, temos novos produtos na loja Hortifruti do Álvaro! Acesse a loja para conferir.", // plain text body
      html: "<b>Olá, temos novos produtos na loja Hortifruti do Álvaro! </b> Acesse a loja para conferir.</b>", // html body
    })
    .then(() => {
      console.log("Deu certo");
      res.status(200).send("Email enviado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send(error);
    });

  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = {
  createStock,
  manageStock,
  sendEmail,
};
