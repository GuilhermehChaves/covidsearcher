const _ = require("lodash");
const moment = require("moment");

exports.lowerCaseKeys = (obj) => {
  const lowerObj = [];
  let currentKey = null;

  _.mapKeys(obj, (value, keyA) => {
    _.transform(value, (result, val, keyB) => {
      if (keyB === "Last_Update") keyB = "date";
      if (keyB === "Long_") keyB = "long";
      result[keyB.toLowerCase().replace(" ", "_")] = val;
      if (currentKey !== keyA) lowerObj.push(result);
      currentKey = keyA;
    });
    return keyA.toLowerCase();
  });

  return lowerObj;
};

exports.formatDates = (obj) => {
  const formatedJSON = {
    jan: [],
    feb: [],
    mar: [],
    apr: [],
    may: [],
    jun: [],
    jul: [],
    aug: [],
    sep: [],
    oct: [],
    nov: [],
    dec: [],
  };

  _.mapKeys(obj, (value) => {
    if (value !== undefined) {
      switch (value.date.split("-")[1]) {
        case "01":
          formatedJSON.jan.push(value);
          return;
        case "02":
          formatedJSON.feb.push(value);
          return;
        case "03":
          formatedJSON.mar.push(value);
          return;
        case "04":
          formatedJSON.apr.push(value);
          return;
        case "05":
          formatedJSON.may.push(value);
          return;
        case "06":
          formatedJSON.jun.push(value);
          return;
        case "07":
          formatedJSON.jul.push(value);
          return;
        case "08":
          formatedJSON.aug.push(value);
          return;
        case "09":
          formatedJSON.set.push(value);
          return;
        case "10":
          formatedJSON.out.push(value);
          return;
        case "11":
          formatedJSON.nov.push(value);
          return;
        case "12":
          formatedJSON.dec.push(value);
          break;

        default:
      }
    }
  });

  return formatedJSON;
};

exports.standardizeDate = (obj) => {
  return _.mapValues(obj, (o) => {
    if (o !== undefined) {
      const date = moment(o.date);
      o.date = date.format("YYYY-MM-DD");

      return o;
    }
    return undefined;
  });
};
