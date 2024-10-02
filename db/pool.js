/* eslint-disable no-undef */
const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.PGHOST || process.env.LOCAL_HOST,
  user: process.env.PGUSER || process.env.LOCAL_USER,
  database: process.env.PGDATABASE || process.env.LOCAL_DATABASE,
  password: process.env.PGPASSWORD || process.env.LOCAL_PASSWORD,
  port: parseInt(process.env.PGPORT || process.env.LOCALDB_PORT),
});
