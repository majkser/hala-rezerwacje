const db = require("./config/db");

db.query("SELECT 1 + 1 AS solution")
  .then(([rows]) => {
    console.log("Połączenie z bazą danych działa! Wynik:", rows[0].solution);
  })
  .catch((err) => {
    console.error("Błąd połączenia z bazą danych:", err);
  });
