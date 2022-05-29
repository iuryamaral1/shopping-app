const uuid = require('uuid');
const moment = require('moment');
const roomGateway = require('../gateways/roomGateway');


const createNewRoom = async (socket, ...args) => {
    const room = {
        name: args[0] ? args[0] : uuid.v4(),
        maxUsers: args[1] ? args[1] : 10,
        expirationDate: args[2] ? args[2] : '2022-05-29',
        users: [socket],
        products: []
    }

    console.log('Creating room with data: ', room);

    await roomGateway.save(room)
}

module.exports = { createNewRoom }