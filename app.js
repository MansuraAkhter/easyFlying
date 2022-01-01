const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passenger = require("./controller/passenger.js");
const admin = require("./controller/admin");
const flights = require("./controller/flights");
const auth = require("./middlewares/auth");
const searchflights = require("./controller/searchflights");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

const homepageController = require("./controller/homepage");

app.get("/", homepageController);

app.post("/api/admin/register", admin.register);
app.post("/api/admin/login", admin.login);
app.post("/api/admin/checklogin", admin.checklogin);
app.post("/api/admin/addflights", flights.addflights);
app.get("/api/admin/getflights", flights.getflights);
app.post("/api/admin/updateflights/:flightID", flights.updateflights);
app.post("/api/admin/deleteflights/:flightID", flights.deleteflights);

app.post("/api/user/register", passenger.register);
app.post("/api/user/checklogin", passenger.checklogin);
app.post("/api/user/login", passenger.login);
app.post("/api/user/searchflights", searchflights.search);
app.get("/api/user/getflight/:flightID", flights.getflight);
app.post("/api/user/bookflight/:flightID", searchflights.book);
app.get("/api/user/ticket/", searchflights.getUserTickets);

app.listen(8080, () => {
  console.log("Server is running...");
});
