const express = require('express');

const routes = require('./Route');
const userCounter = require('./middlewares/userCounter');

class App {
  constructor(){
    this.server = express();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
    this.server.use(userCounter);
  }

  routes(){
    this.server.use(routes);
  }
}

module.exports = new App().server;