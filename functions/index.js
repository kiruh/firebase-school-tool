const express = require("express");
const cookieParser = require("cookie-parser");
const functions = require("firebase-functions");
const { authMiddleware } = require("./middlewares");
const routerUsers = require("./routers/routerUsers");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  return next();
});
app.use(cookieParser());
app.use(authMiddleware);
const routerAPI = express.Router();
routerAPI.use("/users", routerUsers);
app.use("/api", routerAPI);

exports.app = functions.https.onRequest(app);
