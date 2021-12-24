const bcrypt = require("bcrypt");
const admin = require("../model/admin");
const jwtadmin = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const emailResult = await admin.emailExists(email);
    if (emailResult.length == 0) {
      const createAdminResult = await admin.createAdmin(email, hashedPass);
      res.send({ success: true, msg: "admin created" });
    } else {
      res.send({ success: false, msg: "email exists in the database" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.login = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  try {
    const loginResults = await admin.login(email);
    if (loginResults.length > 0) {
      const dbPass = loginResults[0].password;
      const match = await bcrypt.compare(password, dbPass);
      console.log(dbPass, password);
      if (match) {
        const token = await jwtadmin.sign(
          { adminID: loginResults[0].adminID },
          process.env.JWT_ADMIN_SECRET
        );
        res.cookie("jwtadmin", token, {
          maxAge: 900000000,
          httpOnly: true,
        });
        res.send({ success: true, msg: "logged in succesfully" });
      } else {
        res.send({ success: false, msg: "password mismatch" });
      }
    } else {
      res.send({ success: false, msg: "No user exists" });
    }
  } catch (err) {
    res.send(error);
  }
};
