const fs = require('fs');
const axios = require('axios');

module.exports = async function download(url,dir) {
    const response = await axios.get(url)
    fs.writeFile(dir, response.data, function (err) {
        if (err) return console.log(err);
    });
}
