const express = require("express");
const User = require("../models/user");
const Token = require("../models/token");

const routerUsers = express.Router();

routerUsers.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.login({ username, password });
    if (!user) {
      res.status(400).send("Could not login");
    }
    const token = await Token.generateToken(user);
    res.cookie("user-token", token);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(String(error));
  }
});

routerUsers.post("/register", async (req, res, next) => {
  let user = req.body;
  try {
    user = await User.register(user);
    if (!user) {
      res.status(400).send("Could not register");
    }
    const token = await Token.generateToken(user);
    res.cookie("user-token", token);
    res.status(200).send(user.json());
  } catch (error) {
    res.status(400).send(String(error));
  }
});

routerUsers.get("/auth", async (req, res, next) => {
  res.send(req.user ? req.user.json() : null);
});

module.exports = routerUsers;
