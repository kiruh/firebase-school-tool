const express = require("express");
const uuid = require("uuid/v4");
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
    const value = uuid();
    const token = await Token.create({
      userId: user.id,
      value
    });
    res.cookie("user-token", token);
    res.status(200).send({ token: value });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

routerUsers.post("/register", async (req, res, next) => {
  // todo
});

// A route to handle requests to any individual album, identified by an album id
routerUsers.get("/:id", (req, res, next) => {
  let myAlbumId = req.params.albumId;
  // get album data from server and res.send() a response here
});

module.exports = routerUsers;
