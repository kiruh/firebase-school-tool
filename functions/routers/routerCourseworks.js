const express = require("express");
const Coursework = require("../models/coursework");
const { bucket } = require("../connections");

const routerCourseworks = express.Router();

routerCourseworks.get("/", async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(400).send("Authentication is required");
  }
  try {
    const courseworks = await Coursework.filter(["userId", "==", user.id]);
    res.send({ results: courseworks });
  } catch (error) {
    res.status(400).send(String(error));
  }
});

const uploadFile = file => {
  return new Promise((resolve, reject) => {
    const filename = `${Date.now()}_${file.originalname}`;
    const fileWrapper = bucket.file(filename, { public: true });
    const blobStream = fileWrapper.createWriteStream({
      metadata: {
        contentType: file.mimetype
      },
      public: true
    });
    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      resolve(
        `https://storage.googleapis.com/${bucket.name}/${fileWrapper.name}`
      );
    });
    blobStream.on("error", error => {
      reject(error);
    });
    blobStream.end(file.buffer);
  });
};

routerCourseworks.post("/", async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(400).send("Authentication is required");
  }
  const { name } = req.body;
  const [file] = req.files;
  if (!name) {
    return res.status(400).send("coursework.name is required");
  }
  if (!file) {
    return res.status(400).send("coursework.file is required");
  }
  try {
    const filepath = await uploadFile(file);
    if (!filepath) {
      return res.status(400).send("Could not upload file");
    }
    const coursework = await Coursework.create({
      name,
      file: filepath,
      date: new Date().toISOString(),
      userId: user.id
    });
    return res.send(coursework.json());
  } catch (error) {
    return res.status(400).send(String(error));
  }
});

module.exports = routerCourseworks;
