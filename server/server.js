const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const path = require("path");
const session = require("express-session");

dotenv.config();

const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/src/public")));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("../frontend/src/index");
});

loginRoute = require("./routes/login.js");
app.use("/login", loginRoute);

newUserRoute = require("./routes/newUser.js");
app.use("/newUser", newUserRoute);

app.get("/logged", (req, res) => {
  if (req.session.user) {
    res.render("../frontend/src/logged", req.session.user);
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
