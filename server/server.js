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

app.get("/halls", (req, res) => {
  if (req.session.user) {
    res.render("../frontend/src/booking", req.session.user);
  } else {
    res.redirect("/login");
  }
});

app.get("/fetchTimes/:hallID/:date", async (req, res) => {
  try {
    const hallID = req.params.hallID;
    const date = req.params.date;

    const [reservations] = await db.execute(
      `SELECT reservation_time_start, reservation_time_end 
       FROM reservations WHERE hall_id = ? AND reservation_date = ?`,
      [hallID, date]
    );

    const timeSlots = generateTimeSlots(reservations);

    res.json(timeSlots);
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd serwera podczas pobierania dostępnych godzin");
  }
});

function generateTimeSlots(reservations) {
  const timeSlots = [];

  for (let i = 8; i < 22; i++) {
    const time = i;
    const available = !reservations.some((r) => {
      const start = r.reservation_time_start.split(":")[0];
      const end = r.reservation_time_end.split(":")[0];
      return time >= start && time < end;
    });
    timeSlots.push({ time, available });
  }

  return timeSlots;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
