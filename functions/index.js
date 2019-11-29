const express = require("express");
const functions = require("firebase-functions");

const app = express();
app.get("/timestamp", (request, response) => {
  response.send(`${Date.now()}`);
});

exports.app = functions.https.onRequest(app);
