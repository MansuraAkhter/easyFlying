const express = require("express");


const server = express();
const homepageController = require("./controller/homepage");


server.get("/", homepageController);



server.listen(8080, () => {
    console.log("Server is running...");
});


