const jwt = require("jsonwebtoken");

module.exports.admin = async (req, res, next) => {
  const jwtToken = req.cookies["jwtadmin"];
  if (typeof jwtToken === "undefined") {
    return res.send("Not validated");
  } else {
    try {
      const admin = await jwt.verify(jwtToken, process.env.JWT_ADMIN_SECRET);
      req.admin = admin;
      next();
    } catch (err) {
      return res.send("error in auth");
    }
  }
};

module.exports.user = async (req, res, next) => {
  const jwtToken = req.cookies["jwt"];
  if (typeof jwtToken === "undefined") {
    return res.send("Not validated");
  } else {
    try {
      const user = await jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return res.send("error in auth");
    }
  }
};
