const db = require("../db");

module.exports.emailExists = async (email) => {
  const [results, fields] = await db.query(
    "SELECT email FROM admin WHERE email = ?",
    [email]
  );
  return results;
};

module.exports.createAdmin = async (email, password) => {
  const [results, feilds] = await db.query("INSERT INTO admin set ?", {
    email: email,
    password: password,
  });
  return results;
};

module.exports.login = async (email) => {
  const [results, feilds] = await db.query(
    "SELECT adminID,email,password FROM admin WHERE email = ?",
    [email]
  );
  return results;
};
