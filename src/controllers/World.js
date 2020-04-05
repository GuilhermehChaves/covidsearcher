const _ = require('lodash');

const CSVParser = require('../csv/CSVParser');
const { lowerCaseKeys, formatDates } = require( '../util');

class World {
  constructor() {
    this.parser = new CSVParser();
    this.totalCasesByTime = this.totalCasesByTime.bind(this);
    this.casesByTime = this.casesByTime.bind(this);
    this.totalCases = this.totalCases.bind(this);
    this.casesSmaller = this.casesSmaller.bind(this);
    this.casesGreater = this.casesGreater.bind(this);
  }

  async totalCasesByTime(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv')
    const lowerObj = lowerCaseKeys(data);

    data = _.mapKeys(_.keyBy(lowerObj, 'date'), function (value, key) {
      return key.toLowerCase();
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, function(o){
      if(o[0]){return o}
    });

    return response.json(formatedJSON);
  }

  async casesByTime(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv')
    const lowerObj = lowerCaseKeys(data);

    let { date } = request.params;

    data = _.mapKeys(_.keyBy(lowerObj, 'date'), function (value, key) {
      return key.toLowerCase();
    });

    return response.json(data[date]);
  }

  async totalCases(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv')
    const lowerObj = lowerCaseKeys(data);

    data = _.mapKeys(_.keyBy(lowerObj, 'date'), function (value, key) {
      return key.toLowerCase();
    });

    let lastest = _.findLastKey(data, function (o) { return o });

    return response.json(data[lastest]);
  }

  async casesSmaller(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv')
    const lowerObj = lowerCaseKeys(data);

    const { field, value } = request.params;

    data = _.mapKeys(_.keyBy(lowerObj, 'date'), function (value, key) {
      return key.toLowerCase();
    });

    data = _.mapValues(data, function (o) {
      if (o !== undefined && parseInt(o[field]) < value) return o
      return
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, function(o){
      if(o[0]){return o}
    });

    return response.json(formatedJSON);
  }

  async casesGreater(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv')
    const lowerObj = lowerCaseKeys(data);

    const { field, value } = request.params;

    data = _.mapKeys(_.keyBy(lowerObj, 'date'), function (value, key) {
      return key.toLowerCase();
    });

    data = _.mapValues(data, function (o) {
      if (o !== undefined && parseInt(o[field]) > value) return o
      return
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, function(o){
      if(o[0]){return o}
    });

    return response.json(formatedJSON);
  }
}

module.exports = new World();
