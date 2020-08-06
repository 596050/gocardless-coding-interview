const express = require("express");
const router = express.Router();
const cache = {};

const cachedPageKey = "index.html";

const database = {
  [cachedPageKey]: "<html>Hello World!</html>",
};

const getFromDatabase = (key, callback) => {
  callback(database[key]);
};

router.get("/nocache/index.html", (req, res) => {
  getFromDatabase(cachedPageKey, (page) => {
    res.send(page);
  });
});

router.get("/withcache/index.html", (req, res) => {
  if (cachedPageKey in cache) {
    res.send(cache[cachedPageKey]);
    return;
  }
  getFromDatabase(cachedPageKey, (page) => {
    cache[cachedPageKey] = page;
    res.send(page);
  });
});

module.exports = router;
