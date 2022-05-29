const socket = require('socket.io')

const server = (port) => {
    const io = new socket.Server(port);
    console.log(`Started server on port ${port}`);
    return io;
}

module.exports = { server }