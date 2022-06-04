const moment = require('moment');
const shoppingListGateway = require('../../gateways/shoppingList/shoppingListGateway');
const productGateway = require('../../gateways/product/productGateway')

const addNewShoppingList = async (shoppingList, socketId) => {
    const savedShoppingList = await shoppingListGateway.save({
        name: shoppingList.name,
        expirationDate: moment().add(5, 'd').toDate(),
        room: shoppingList.room,
        active: true
    });

    const savedProducts = await shoppingList.products.map((product) => productGateway.save(product));
    return {
        shoppingList: savedShoppingList,
        products: savedProducts
    }
}

module.exports = {
    addNewShoppingList
}