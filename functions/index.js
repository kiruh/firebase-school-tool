const express = require("express");
const cookieParser = require("cookie-parser");
const functions = require("firebase-functions");
const { authMiddleware } = require("./middlewares");
const routerUsers = require("./routers/routerUsers");

const app = express();
app.use(cookieParser());
app.use(authMiddleware);
app.use("/users", routerUsers);
app.get("/test", (req, res) => {
  res.send({
    date: Date.now(),
    user: req.user ? req.user.json() : null
  });
});

exports.app = functions.https.onRequest(app);
