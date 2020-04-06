const io = require("@pm2/io");

const currentRequests = io.counter({
    name: "Realtime request count",
    id: "app/realtime/requests",
});

module.exports = (request, response, next) => {
    currentRequests.inc();
    request.on('end', () => {
        currentRequests.dec();
    });

    next();
}