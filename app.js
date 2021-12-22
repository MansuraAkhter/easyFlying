const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passenger = require("./controller/passenger.js")



const app = express();

app.use (express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"]
}));
app.use(cookieParser());


const homepageController = require("./controller/homepage");
const { append } = require("express/lib/response");


app.get("/", homepageController);

app.post("/api/user/register", passenger.register);
app.post("/api/user/login", passenger.login);


app.listen(8080, () => {
    console.log("Server is running...");
});


