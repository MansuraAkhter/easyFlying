const bcrypt = require("bcrypt");
const db = require("../db");
const passenger = require("../model/passenger");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const body = req.body;
  const name = body.name;
  const email = body.email;
  const password = body.password;
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const emailResult = await passenger.emailExists(email);
    if (emailResult.length == 0) {
      const userCreateResult = await passenger.createUser(
        name,
        email,
        hashedPass
      );
      res.send({ success: true, msg: "user created" });
    } else {
      res.send("email exists in the database");
    }
  } catch (err) {
    res.send("error");
  }
};

module.exports.login = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  try {
    const loginResults = await passenger.login(email);
    if (loginResults.length > 0) {
      const dbPass = loginResults[0].password;
      const match = await bcrypt.compare(password, dbPass);
      if (match) {
        const token = await jwt.sign(
          { userID: loginResults[0].userID },
          process.env.JWT_SECRET
        );
        res.cookie("jwt", token, {
          maxAge: 900000000,
          httpOnly: true,
        });
        res.send({ success: true });
      } else {
        res.send("password mismatch");
      }
    } else {
      res.send("No user exists");
    }
  } catch (err) {
    res.send("Error in login");
  }
};

module.exports.checklogin = async (req, res) => {
  const error = {
    success: false,
    msg: "not authenticated",
  };
  const jwtToken = req.cookies["jwt"];
  if (typeof jwtToken === "undefined") {
    console.log("no token");
    return res.send(error);
  } else {
    try {
      const user = await jwt.verify(jwtToken, process.env.JWT_SECRET);
      return res.send({ success: true, userID: user.userID });
    } catch (err) {
      console.log(err);
      return res.send(error);
    }
  }
};
