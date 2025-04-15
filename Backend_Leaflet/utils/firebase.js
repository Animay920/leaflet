const admin = require("firebase-admin");
const serviceAccount = require("../firebaseServiceKey.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "leaflet-abca7.appspot.com", 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
