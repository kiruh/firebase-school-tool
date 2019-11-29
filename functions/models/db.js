const firebase = require("firebase-admin");
const serviceAccountKey = require("../serviceAccountKey");

// connect to db
let db;
try {
  firebase.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://school-tool-5022e.firebaseio.com"
  });
  db = firebase.firestore();
} catch (error) {
  console.error(error);
}

module.exports = { db };
