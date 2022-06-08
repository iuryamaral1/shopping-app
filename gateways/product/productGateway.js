const db = require('../../configuration/database')
const uuid = require('uuid')
const moment = require('moment')

const save = async (product) => {
    const q = `
        INSERT INTO 
            product(id, name, price_in_cents, expiration_date, supermarket) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `;
    const values = [uuid.v4(), product.name, product.price, moment().add(30, 'd').toDate(), product.supermarket];
    const result = await db.query(q, values);
    return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        priceInCents: result.rows[0].price_in_cents,
        expirationDate: result.rows[0].expiration_date,
        supermarket: result.rows[0].supermarket
    }
}

module.exports = { 
    save 
}