require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.config");
const customer_routes = require("./src/routes/customer.routes");
const producer_routes = require("./src/routes/producer.routes");
const product_routes = require("./src/routes/product.routes");
const sales_routes = require("./src/routes/sales.routes");
const baseunit_routes = require("./src/routes/baseunit.routes");
const stock_routes = require("./src/routes/stock.routes");
const analiseData_routes = require("./src/routes/analiseData.routes");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 8080;

//configuring cors
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/customer", customer_routes);
app.use("/producer", producer_routes);
app.use("/product", product_routes);
app.use("/sales", sales_routes);
app.use("/baseunit", baseunit_routes);
app.use("/stock", stock_routes);
app.use("/analiseData", analiseData_routes);

// listen for requests
app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await sequelize.sync();
});

module.exports = app;
