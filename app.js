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

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());

const homepageController = require("./controller/homepage");
const { append } = require("express/lib/response");

app.get("/", homepageController);

app.post("/api/user/register", passenger.register);
app.post("/api/user/login", passenger.login);
app.post("/api/user/checklogin", passenger.checklogin);
app.post("/api/admin/register", admin.register);
app.post("/api/admin/login", admin.login);
app.post("/api/admin/addflights", flights.addflights);
app.get("/api/admin/getflights", flights.getflights);
app.post(
  "/api/admin/updateflights/:flightID",
  auth.admin,
  flights.updateflights
);
app.post(
  "/api/admin/deleteflights/:flightID",
  auth.admin,
  flights.deleteflights
);

app.listen(8080, () => {
  console.log("Server is running...");
});
