require('dotenv').config();
const start = require('./server');
const handleEvents = require('./handleEvents');

;(_ => {
    console.log('Starting server...');
    const server = start.server(process.env.PORT);
    server.on('connection', (socket) => {
        handleEvents.handle(socket);        
    });
})();