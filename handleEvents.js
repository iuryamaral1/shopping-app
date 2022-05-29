const { createNewRoom } = require('./useCases/createNewRoom')

const handle = (socket) => {

    socket.on('create-new-room', async (...args) => {
        await createNewRoom(socket, args)
    });
}

module.exports = { handle }