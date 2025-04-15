const bucket = require("./firebase");

const uploadToFirebase = async (file) => {
  const destination = `notes/${Date.now()}_${file.originalname}`;
  const blob = bucket.file(destination);

  const stream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => reject(err));
    stream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    stream.end(file.buffer);
  });
};

module.exports = uploadToFirebase;
