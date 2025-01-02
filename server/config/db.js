const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MIKSERek08",
  database: "hala_rezerwacje",
});

module.exports = pool.promise();
