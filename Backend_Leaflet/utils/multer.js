const multer = require("multer");

const storage = multer.memoryStorage(); // keep files in memory

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const ext = filetypes.test(file.originalname.toLowerCase());
  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF files allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // limt 100 MB
});

module.exports = upload;
