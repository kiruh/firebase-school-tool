const express = require("express");
const functions = require("firebase-functions");
const authMiddleware = require("./middlewares");
const routerUsers = require("./routers/routerUsers");

const app = express();
app.get("/timestamp", (request, response) => {
  response.send(`${Date.now()}`);
});
app.use(express.cookieParser());
app.use(authMiddleware);
app.use(routerUsers);

exports.app = functions.https.onRequest(app);
