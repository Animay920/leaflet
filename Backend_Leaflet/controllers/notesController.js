const db = require("../Config/db.cjs");
const uploadToFirebase = require("../utils/firebaseUploader");
const bucket = require("../utils/firebase");

// Add Note
const addNote = async (req, res) => {
  const { username, course_code, title, type, content } = req.body;
  let fileUrl = null;

  try {
    if (req.file) {
      fileUrl = await uploadToFirebase(req.file);
    }

    const sql = `
      INSERT INTO notes (username, course_code, title, type, content, file_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [username, course_code, title, type, content || "", fileUrl], (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", err });
      res.status(201).json({ message: "Note added", fileUrl, note_id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ message: "Upload error", error: err.message });
  }
};

// Get Notes by course_code and/or username
const getNotes = (req, res) => {
  const { username, course_code } = req.query;
  let sql = `SELECT * FROM notes WHERE 1=1`;
  const params = [];

  if (username) {
    sql += ` AND username = ?`;
    params.push(username);
  }

  if (course_code) {
    sql += ` AND course_code = ?`;
    params.push(course_code);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    res.status(200).json(results);
  });
};

// Edit Note (title/content/type + optional new file)
const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, type } = req.body;
  let fileUrl = null;

  try {
    if (req.file) {
      fileUrl = await uploadToFirebase(req.file);
    }

    const sql = `
      UPDATE notes SET title = ?, content = ?, type = ?, file_path = ?
      WHERE id = ?
    `;
    db.query(sql, [title, content || "", type, fileUrl, id], (err) => {
      if (err) return res.status(500).json({ message: "DB update error", err });
      res.status(200).json({ message: "Note updated", fileUrl });
    });
  } catch (err) {
    res.status(500).json({ message: "Edit failed", error: err.message });
  }
};

// Delete Note (DB + Firebase file)
const deleteNote = (req, res) => {
  const { id } = req.params;

  const selectQuery = "SELECT file_path FROM notes WHERE id = ?";
  db.query(selectQuery, [id], (err, result) => {
    if (err || result.length === 0)
      return res.status(404).json({ message: "Note not found" });

    const fileUrl = result[0].file_path;

    // Delete from Firebase if file exists
    if (fileUrl) {
      const fileName = fileUrl.split("/").slice(-1)[0];
      const file = bucket.file(`notes/${fileName}`);
      file.delete().catch((err) => {
        console.error("Firebase delete error (non-blocking):", err.message);
      });
    }

    // Delete from DB
    const deleteQuery = "DELETE FROM notes WHERE id = ?";
    db.query(deleteQuery, [id], (err) => {
      if (err) return res.status(500).json({ message: "DB delete error", err });
      res.status(200).json({ message: "Note deleted" });
    });
  });
};

module.exports = {
  addNote,
  getNotes,
  editNote,
  deleteNote,
};
