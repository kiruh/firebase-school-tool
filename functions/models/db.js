const firebase = require("firebase-admin");
const serviceAccountKey = require("../serviceAccountKey");

// connect to db
let db;
try {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: "https://school-tool-5022e.firebaseio.com"
  });
  db = firebase.firestore();
} catch (error) {
  console.error(error);
}

module.exports = db;
