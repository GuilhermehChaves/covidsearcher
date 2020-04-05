const { Router } = require('express');
const path = require('path');

const Country = require('./controllers/Country');
const World = require( './controllers/World');

class Route {
  constructor() {
    this.router = new Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/', function(request, response){
      response.sendFile(path.join(__dirname+'/index.html'));
    });
    this.router.get('/v1/countries/total', Country.allTotalCases);
    this.router.get('/v1/countries/:country/total', Country.totalCases);
    this.router.get('/v1/countries/:country/time', Country.casesByTime);
    this.router.get('/v1/countries/where/:field/smaller/:value', Country.smallerThan);
    this.router.get('/v1/countries/where/:field/greater/:value', Country.greaterThan);
    this.router.get('/v1/countries/:country/where/:field/smaller/:value', Country.casesSmallerByTime);
    this.router.get('/v1/countries/:country/where/:field/greater/:value', Country.casesGreaterByTime);

    this.router.get('/v1/world/total/time', World.totalCasesByTime);
    this.router.get('/v1/world/total/time/:date', World.casesByTime);
    this.router.get('/v1/world/total', World.totalCases);
    this.router.get('/v1/world/total/time/where/:field/smaller/:value', World.casesSmaller);
    this.router.get('/v1/world/total/time/where/:field/greater/:value', World.casesGreater);
  }
}

module.exports = new Route().router;