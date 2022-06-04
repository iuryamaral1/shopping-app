const roomGateway = require('../../gateways/roomGateway');

const hasList = async (room) => {
    const quantityOfActiveShoppingLists = await roomGateway.hasActiveShoppingList(room);    
    return quantityOfActiveShoppingLists > 0
} 

module.exports = { hasList }