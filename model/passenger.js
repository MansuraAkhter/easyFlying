const db = require("../db");

module.exports.emailExists = async (email) => {
  const [results, fields] = await db.query(
    "SELECT email FROM passenger WHERE email = ?",
    [email]
  );
  return results;
};

module.exports.createUser = async (name, email, password) => {
  const [results, fields] = await db.query("INSERT INTO passenger set ?", {
    name: name,
    email: email,
    password: password,
  });
  return results;
};

module.exports.login = async (email) => {
  const [results, fields] = await db.query(
    "SELECT userID, email, password FROM passenger WHERE email = ?",
    [email]
  );
  return results;
};
