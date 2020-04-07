const ua = require('universal-analytics');
require('dotenv').config();

module.exports = (request, response, next) => {
    const visitor = ua(process.env.TRACKING_ID);

    visitor.pageview({
        dp: request.url,
        dh: request.headers.host,
        uip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
        ua: request.headers['user-agent'],
        dr: request.headers.referrer || request.headers.referer,
        de: request.headers['accept-encoding'],
        ul: request.headers['accept-language']
    }, { http: true }).send();

    next();
};