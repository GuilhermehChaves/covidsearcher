const csv = require('csvtojson');
const request = require('request');

class CSVParser {
  async parseToJson(path){
    let regex = new RegExp("https?://[A-Za-z0-9./]+", "gm");
    
    if(regex.test(path)){
      return await csv().fromStream(request.get(path));
    }

    return await csv().fromFile(path)
  }
}

module.exports =  CSVParser;