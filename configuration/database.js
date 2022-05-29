const pg = require('pg');

const config = {
  user: process.env.PGUSER, // env var: PGUSER
  database: process.env.PGDATABASE, // env var: PGDATABASE
  password: process.env.PGPASSWORD, // env var: PGPASSWORD
  host: process.env.DATABASE_HOST, // Server hosting the postgres database
  port: process.env.DATABASE_PORT, // env var: PGPORT
  max: process.env.CLIENT_POOL_MAX, // max number of clients in the pool
  idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

async function query (q, p) {
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q, p)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    return res
  }

module.exports = { query }