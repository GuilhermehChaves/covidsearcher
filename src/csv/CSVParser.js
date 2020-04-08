const csv = require("csvtojson");
const request = require("request");

class CSVParser {
  async parseToJson(path) {
    this.regex = new RegExp("https?://[A-Za-z0-9./]+", "gm");

    this.result = this.regex.test(path)
      ? await csv().fromStream(request.get(path))
      : await csv().fromFile(path);

    return this.result;
  }
}

module.exports = CSVParser;
