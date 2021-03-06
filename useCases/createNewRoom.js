const uuid = require('uuid');
const roomGateway = require('../gateways/roomGateway');

const createNewRoom = async (socket, ...args) => {
    const room = {
        name: args[0] ? args[0] : uuid.v4(),
        maxUsers: args[1] ? args[1] : 10,
        expirationDate: args[2] ? args[2] : '2022-05-29',
        users: [socket],
        products: []
    }

    await roomGateway.save(room)
}

module.exports = { createNewRoom }