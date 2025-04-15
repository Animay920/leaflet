const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  addNote,
  getNotes,
  editNote,
  deleteNote
} = require("../controllers/notesController");

router.post("/add", addNote); // For plain text notes

router.post("/upload", upload.single("file"), addNote); // For file/image notes

router.get("/:course_code", getNotes); // Get all notes for a course

router.put("/edit/:note_id", upload.single("file"), editNote); // Edit notes by ID

router.delete("/delete/:note_id", deleteNote); // Delete a note by ID

module.exports = router;
