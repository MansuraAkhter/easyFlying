const express = require("express");

const server = express();


server.get("/", (req, res) => {
   res.send("This is working");
})

server.listen(8080, () => {
    console.log("Server is running...");
})