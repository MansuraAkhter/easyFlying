const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
});

db.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected..")
    }
})


const server = express();
const homepageController = require("./controller/homepage");


server.get("/", homepageController);



server.listen(8080, () => {
    console.log("Server is running...");
});


