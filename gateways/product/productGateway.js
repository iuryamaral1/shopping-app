const db = require('../../configuration/database')
const uuid = require('uuid')
const moment = require('moment')

const save = async (product) => {
    const q = "INSERT INTO product(id, name, price, expiration_date, supermarket) VALUES ($1, $2, $3, $4, $5)";
    const values = [uuid.v4(), product.name, product.price, moment().add(30, 'd').toDate(), product.supermarket];
    const result = await db.query(q, values);
    return {
        id: result.rows[0],
        name: result.rows[1],
        price: result.rows[2],
        expirationDate: result.rows[3],
        supermarket: result.rows[4]
    }
}

module.exports = { 
    save 
}