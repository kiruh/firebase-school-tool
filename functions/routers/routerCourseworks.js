const express = require("express");
const Coursework = require("../models/coursework");

const routerCourseworks = express.Router();

routerCourseworks.get("/", async (req, res, next) => {
  try {
    const courseworks = await Coursework.getAll();
    res.send({ results: courseworks });
  } catch (error) {
    res.status(400).send(String(error));
  }
});

routerCourseworks.post("/", async (req, res, next) => {
  // todo
});

module.exports = routerCourseworks;
