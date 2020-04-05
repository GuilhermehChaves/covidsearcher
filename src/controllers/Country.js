const _ = require('lodash');

const CSVParser = require('../csv/CSVParser');
const { lowerCaseKeys, formatDates, standardizeDate } = require('../util');

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
  }

  async allTotalCases(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv');
    const lowerObj = lowerCaseKeys(data);

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, 'country_region'), function (value, key) {
        return key.toLowerCase();
      })
    );

    return response.json(data);
  }

  async totalCases(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv');
    const lowerObj = lowerCaseKeys(data);
    const { country } = request.params;

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, 'country_region'), function (value, key) {
        return key.toLowerCase();
      })
    );

    return response.json(data[country]);
  }

  async casesByTime(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv');
    const lowerObj = lowerCaseKeys(data);
    let { country } = request.params;

    data = standardizeDate(
      _.mapValues(lowerObj, function (o) {
        if (o != undefined && o.country_region.toLowerCase() == country) {
          return o;
        }
        return
      })
    );

    data = _.keyBy(data, 'date', function (value, key) {
      return key
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, function (o) {
      if (o[0]) { return o }
    });

    return response.json(formatedJSON);
  }

  async casesSmallerByTime(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv');
    const lowerObj = lowerCaseKeys(data);
    let { country, field, value } = request.params;

    data = standardizeDate(
      _.mapValues(lowerObj, function (o) {
        if (o != undefined && o.country_region.toLowerCase() == country) {
          return o
        };
        return
      })
    );

    data = _.keyBy(data, 'date', function (value, key) {
      return key.toLowerCase();
    });

    data = _.mapValues(data, function (o) {
      if (o !== undefined && parseInt(o[field]) < value) return o;
      return
    });

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, function (o) {
      if (o[0]) { return o }
    });

    return response.json(formatedJSON);
  }

  async casesGreaterByTime(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv');
    const lowerObj = lowerCaseKeys(data);
    let { country, field, value } = request.params;

    data = standardizeDate(
      _.mapValues(lowerObj, function (o) {
        if (o.country_region.toLowerCase() == country) {
          return o
        };
        return
      })
    );

    data = _.keyBy(data, 'date', function (value, key) {
      return key.toLowerCase();
    });

    data = _.mapValues(data, function (o) {
      if (o !== undefined && parseInt(o[field]) > value) return o;
      return
    })

    let formatedJSON = formatDates(data);

    formatedJSON = _.mapValues(formatedJSON, function (o) {
      if (o[0]) { return o }
    });

    return response.json(formatedJSON);
  }

  async smallerThan(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv');
    const lowerObj = lowerCaseKeys(data);
    const { field, value } = request.params;

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, 'country_region'), function (value, key) {
        return key.toLowerCase();
      })
    );

    data = _.mapValues(data, function (o) {
      if (parseInt(o[field]) < value) return o;
      return
    });

    return response.json(data);
  }

  async greaterThan(request, response) {
    let data = await this.parser.parseToJson('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv');
    const lowerObj = lowerCaseKeys(data);
    const { field, value } = request.params;

    data = standardizeDate(
      _.mapKeys(_.keyBy(lowerObj, 'country_region'), function (value, key) {
        return key.toLowerCase();
      })
    );

    data = _.mapValues(data, function (o) {
      if (parseInt(o[field]) > value) return o;
      return
    });

    return response.json(data);
  }
}

module.exports = new Country();