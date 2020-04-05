const _ = require('lodash');

exports.lowerCaseKeys = (obj) => {
  var lowerObj = []

  _.mapKeys(obj, function (value, key) {
    _.transform(value, function (result, val, key) {
      if(key == "Last_Update") key = "date";
      result[key.toLowerCase().replace(' ', '_')] = val;
      lowerObj.push(result);
    });
    return key.toLowerCase()
  });

  return lowerObj;
}

exports.formatDates = (obj) => {
  let formatedJSON = {
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
  }

  _.mapKeys(obj, function (value, key) {
    if (value != undefined) {
      switch (key.split("-")[1]) {
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
          return
        case "05":
          formatedJSON.may.push(value);
          return
        case "06":
          formatedJSON.jun.push(value);
          return
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
          return
        case "12":
          formatedJSON.dec.push(value);
          return
        default:
          return;
      }
    }
  });

  return formatedJSON;
}