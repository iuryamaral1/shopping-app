const db = require('../configuration/database')

const saveRelation = async (product, shoppingList, username) => {
    console.log(`Saving username ${username}`)
    const q = `
        INSERT INTO product_shopping_list
            (product_id, shopping_list_id, username)
        VALUES 
            ($1, $2, $3)
    `
    await db.query(q, [product.id, shoppingList.id, username])
}

module.exports = { saveRelation }