const express = require("express");

const routes = require("./Route");
const userCounter = require("./middlewares/userCounter");
const analytics = require("./middlewares/analytics");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(userCounter);
    this.server.use(analytics);
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
