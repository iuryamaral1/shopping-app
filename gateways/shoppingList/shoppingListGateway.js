const db = require('../../configuration/database')
const uuid = require('uuid')
const moment = require('moment')

const save = async (shoppingList) => {
    const q = "INSERT INTO shopping_list (id, name, expiration_date, room, active) VALUES ($1, $2, $3, $4, $5)";
    const values = [uuid.v4(), shoppingList.name, moment().add(5, 'd').toDate(), shoppingList.room, true]
    const result = await db.query(q, values);
    return {
        id: result.rows[0],
        name: result.rows[1],
        expirationDate: result.rows[2],
        room: result.rows[3],
        active: result.rows[4]
    }
}

module.exports = {
    save
}