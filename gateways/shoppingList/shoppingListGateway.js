const db = require('../../configuration/database')
const uuid = require('uuid')
const moment = require('moment')

const save = async (shoppingList) => {
    const q = `
    INSERT INTO 
        shopping_list (id, name, expiration_date, room, active) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const values = [uuid.v4(), shoppingList.name, moment().add(5, 'd').toDate(), shoppingList.room, true]
    const result = await db.query(q, values);
    return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        expirationDate: result.rows[0].expiration_date,
        room: result.rows[0].room,
        active: result.rows[0].active
    }
}

module.exports = {
    save
}