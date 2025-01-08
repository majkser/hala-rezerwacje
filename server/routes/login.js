const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile("login.html", { root: "./frontend/src" });
});

router.post("/submit", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (!username || !password || !role) {
      return res.status(400).send("Nie podano nazwy użytkownika lub hasła");
    }

    const [users] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    const user = users[0];

    const isValidPassword = user.password === password;

    if (!user || !isValidPassword) {
      return res.status(401).send("Nieprawidłowa nazwa użytkownika lub hasło");
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    res.redirect("/logged");
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd serwera podczas logowania");
  }
});

module.exports = router;
