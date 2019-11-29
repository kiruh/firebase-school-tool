const express = require("express");
const cookieParser = require("cookie-parser");
const functions = require("firebase-functions");
const { authMiddleware } = require("./middlewares");
const routerUsers = require("./routers/routerUsers");

const app = express();
app.get("/timestamp", (request, response) => {
  response.send(`${Date.now()}`);
});
app.use(cookieParser());
app.use(authMiddleware);
app.use("/users", routerUsers);

exports.app = functions.https.onRequest(app);
