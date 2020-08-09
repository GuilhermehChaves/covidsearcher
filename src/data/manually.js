const download = require('./download');

console.info('Downloading...');
download('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv', './src/data/cases_country.csv');
download('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_time.csv', './src/data/cases_time.csv');
download('https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv', './src/data/worldwide-aggregated.csv');
console.info('Done!!!');
