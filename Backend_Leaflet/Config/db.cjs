const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database");

  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS notes (
      note_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      course_code VARCHAR(100),
      title VARCHAR(255),
      type ENUM('text', 'file', 'image') NOT NULL,
      content TEXT,
      file_path VARCHAR(500),
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createNotesTable, (err) => {
    if (err) {
      console.error(" Failed to create notes table:", err.message);
    } else {
      console.log(" Notes table ready");
    }
  });

  connection.release();
});
module.exports = db;
