require('dotenv').config()
const start = require('./server');
const handleEvents = require('./handleEvents');

(_ => {
    console.log('Starting server...');
    console.log(process.env.PORT)
    const server = start.server(process.env.PORT);
    console.log('Starting db?');
    server.on('connection', (socket) => {
        console.log('A new user has connected successfully!');
        handleEvents.handle(socket);
    });
})();