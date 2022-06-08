const moment = require('moment');
const shoppingListGateway = require('../../gateways/shoppingList/shoppingListGateway');
const productGateway = require('../../gateways/product/productGateway')
const productShoppingRelationGateway = require('../../gateways/productShoppingListRelGateway')

const addNewShoppingList = async (shoppingList, username) => {    
    console.log(`This username is : ${username}`)
    const savedShoppingList = await shoppingListGateway.save({
        name: shoppingList.name,
        expirationDate: moment().add(5, 'd').toDate(),
        room: shoppingList.room,
        active: true
    });

    const savedProducts = shoppingList.products.map( async (product) => {
        const savedProduct = await productGateway.save(product)
        await productShoppingRelationGateway.saveRelation(savedProduct, savedShoppingList, username)
    });
    return {
        shoppingList: savedShoppingList,
        products: savedProducts
    }
}

module.exports = {
    addNewShoppingList
}