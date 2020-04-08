const _ = require("lodash");

const CSVParser = require("../csv/CSVParser");
const { lowerCaseKeys, formatDates } = require("../util");

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
    const data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv"
    );
    const lowerObj = lowerCaseKeys(data);

    let formatedJSON = formatDates(lowerObj);

    formatedJSON = _.mapValues(formatedJSON, (o) => {
      return o[0] ? o : undefined;
    });

    return response.json(formatedJSON);
  }

  async casesByTime(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv"
    );
    const lowerObj = lowerCaseKeys(data);

    const { date } = request.params;

    data = _.mapKeys(_.keyBy(lowerObj, "date"), (value, key) => {
      return key.toLowerCase();
    });

    return response.json(data[date]);
  }

  async totalCases(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv"
    );
    const lowerObj = lowerCaseKeys(data);

    data = _.mapKeys(_.keyBy(lowerObj, "date"), (value, key) => {
      return key.toLowerCase();
    });

    const lastest = _.findLastKey(data, (o) => {
      return o;
    });

    return response.json(data[lastest]);
  }

  async casesSmaller(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv"
    );

    const lowerObj = lowerCaseKeys(data);
    const { field, value } = request.params;

    data = _.mapValues(lowerObj, (o) => {
      return o !== undefined && parseInt(o[field], 10) < value ? o : undefined;
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, (o) => {
      return o[0] ? o : undefined;
    });

    return response.json(formatedJSON);
  }

  async casesGreater(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv"
    );
    const lowerObj = lowerCaseKeys(data);

    const { field, value } = request.params;

    data = _.mapValues(lowerObj, (o) => {
      return o !== undefined && parseInt(o[field], 10) > value ? o : undefined;
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, (o) => {
      return o[0] ? o : undefined;
    });

    return response.json(formatedJSON);
  }
}

module.exports = new World();
