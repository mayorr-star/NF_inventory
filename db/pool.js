const { Pool } = require("pg");

let connection = null;

if (process.env.NODE_ENV === "development") {
  connection = process.env.DATABASE_URL;
} else {
  connection = process.env.DATABASE_PUBLIC_URL;
}

module.exports = new Pool({
  connectionString: connection,
});