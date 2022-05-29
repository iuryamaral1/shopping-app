const db = require('../configuration/database')
const uuid = require('uuid')

const save = async (room) => {
    const q = "INSERT INTO room (id, name, max_users, expiration_date) values ($1, $2, $3, $4) RETURNING *;";
    const id = uuid.v4()
    const result = await db.query(q, [id, room.name, room.maxUsers, room.expirationDate]);
    console.log(result);
}

const findRoom = async (id) => {
    const q = "SELECT * FROM room WHERE id = $1";
    const result = await db.query(q, [id]);
    console.log(result)
}

module.exports = {
    save,
    findRoom
}