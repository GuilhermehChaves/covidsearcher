const _ = require("lodash");
const { resolve } = require("path");
const fs = require("fs");

const CSVParser = require("../csv/CSVParser");
const { lowerCaseKeys, formatDates, standardizeDate } = require("../util");

class Country {
  constructor() {
    this.parser = new CSVParser();
    this.allTotalCases = this.allTotalCases.bind(this);
    this.totalCases = this.totalCases.bind(this);
    this.casesByTime = this.casesByTime.bind(this);
    this.smallerThan = this.smallerThan.bind(this);
    this.greaterThan = this.greaterThan.bind(this);
    this.casesSmallerByTime = this.casesSmallerByTime.bind(this);
    this.casesGreaterByTime = this.casesGreaterByTime.bind(this);
    this.population = this.population.bind(this);
  }

  async allTotalCases(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"
    );
    const lowerObj = lowerCaseKeys(data);

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, "country_region"), (value, key) => {
        return key.toLowerCase().replace(new RegExp(" ", "g"), "_");
      })
    );

    return response.json(data);
  }

  async totalCases(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"
    );
    const lowerObj = lowerCaseKeys(data);
    const { country } = request.params;

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, "country_region"), (value, key) => {
        return key.toLowerCase().replace(new RegExp(" ", "g"), "_");
      })
    );

    return response.json(data[country]);
  }

  async casesByTime(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv"
    );
    const lowerObj = lowerCaseKeys(data);
    const { country } = request.params;

    data = standardizeDate(
      _.mapValues(lowerObj, (o) => {
        return o !== undefined && o.country_region.toLowerCase() === country
          ? o
          : undefined;
      })
    );

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, (o) => {
      return o[0] ? o : undefined;
    });

    return response.json(formatedJSON);
  }

  async casesSmallerByTime(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv"
    );
    const lowerObj = lowerCaseKeys(data);
    const { country, field, value } = request.params;

    data = standardizeDate(
      _.mapValues(lowerObj, (o) => {
        return o !== undefined && o.country_region.toLowerCase() === country
          ? o
          : undefined;
      })
    );

    data = _.mapValues(data, (o) => {
      return o !== undefined && parseInt(o[field], 10) < value ? o : undefined;
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, (o) => {
      return o[0] ? o : undefined;
    });

    return response.json(formatedJSON);
  }

  async casesGreaterByTime(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv"
    );
    const lowerObj = lowerCaseKeys(data);
    const { country, field, value } = request.params;

    data = standardizeDate(
      _.mapValues(lowerObj, (o) => {
        return o.country_region.toLowerCase() === country ? o : undefined;
      })
    );

    data = _.mapValues(data, (o) => {
      return o !== undefined && parseInt(o[field], 10) > value ? o : undefined;
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, (o) => {
      return o[0] ? o : undefined;
    });

    return response.json(formatedJSON);
  }

  async smallerThan(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"
    );
    const lowerObj = lowerCaseKeys(data);
    const { field, value } = request.params;

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, "country_region"), (val, key) => {
        return key.toLowerCase().replace(new RegExp(" ", "g"), "_");
      })
    );

    data = _.mapValues(data, (o) => {
      return parseInt(o[field], 10) < value ? o : undefined;
    });

    return response.json(data);
  }

  async greaterThan(request, response) {
    let data = await this.parser.parseToJson(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"
    );
    const lowerObj = lowerCaseKeys(data);
    const { field, value } = request.params;

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, "country_region"), (val, key) => {
        return key.toLowerCase().replace(new RegExp(" ", "g"), "_");
      })
    );

    data = _.mapValues(data, (o) => {
      return parseInt(o[field], 10) > value ? o : undefined;
    });

    return response.json(data);
  }

  async population(request, response) {
    let data = JSON.parse(
      fs.readFileSync(resolve(__dirname, "..", "data", "population.json"))
    );

    data = _.mapKeys(_.keyBy(data.data, "country_region"), (val, key) => {
      return key.toLowerCase().replace(new RegExp(" ", "g"), "_");;
    });

    return response.json(data);
  }
}

module.exports = new Country();
