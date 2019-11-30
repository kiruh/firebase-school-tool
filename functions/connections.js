const firebase = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey");

let db;
let bucket;
try {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccountKey),
    databaseURL: "https://school-tool-5022e.firebaseio.com",
    storageBucket: "gs://school-tool-5022e.appspot.com/"
  });
  db = firebase.firestore();
  bucket = firebase.storage().bucket();
} catch (error) {
  console.error(error);
}

module.exports = { db, bucket };
