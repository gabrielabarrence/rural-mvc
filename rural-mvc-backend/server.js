require("dotenv").config();
const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  configureRoutes() {
    const customerRoutes = require("./src/routes/customer.routes");
    // const producerRoutes = require("./src/routes/producer.routes");
    // const productRoutes = require("./src/routes/product.routes");
    // const salesRoutes = require("./src/routes/sales.routes");
    // const baseunitRoutes = require("./src/routes/baseunit.routes");
    // const stockRoutes = require("./src/routes/stock.routes");
    // const analiseDataRoutes = require("./src/routes/analiseData.routes");

    this.app.use("/customer", customerRoutes);
    // this.app.use("/producer", producerRoutes);
    // this.app.use("/product", productRoutes);
    // this.app.use("/sales", salesRoutes);
    // this.app.use("/baseunit", baseunitRoutes);
    // this.app.use("/stock", stockRoutes);
    // this.app.use("/analiseData", analiseDataRoutes);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

new Server();
