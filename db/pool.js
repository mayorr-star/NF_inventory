const { Pool } = require("pg");

let connectionString = null;

switch (process.env.NODE_ENV) {
  case "dev":
    connectionString = process.env.DATABASE_LOCAL_URL;
    break;
  default:
    connectionString = process.env.DATABASE_PUBLIC_URL;
}

module.exports = new Pool({
  connectionString: connectionString,
});
