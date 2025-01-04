const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile("newUser.html", { root: "./frontend/src" });
});

router.post("/submit", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (!username || !password || !role) {
      return res
        .status(400)
        .send("Nie podano nazwy użytkownika, hasła lub roli");
    }

    const [existingUsers] = await db.execute(
      "SELECT username FROM users WHERE username = ?",
      [username]
    );

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "Nazwa użytkownika jest już zajęta" });
    }

    const [newUser] = await db.execute(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, password, role]
    );

    res.status(201).json({
      message: "Użytkownik został dodany pomyślnie",
      id: newUser.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd serwera podczas dodawania nowego użytkownika");
  }
});

module.exports = router;
