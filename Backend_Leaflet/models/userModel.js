// import { db } from "../Config/db.cjs";
const db = require("../Config/db.cjs");

const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.length > 0 ? results[0] : null);
  });
};

const createUser = (username, email, password, callback) => {
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, password], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

module.exports = { findUserByEmail, createUser };
