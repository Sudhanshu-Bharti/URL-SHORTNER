const express = require("express");

const router = express.Router();

const {
  HandleGenerateShortURL,
  HandleAnalytics,
} = require("../controllers/url");

router.post("/", HandleGenerateShortURL);

router.get("/analytics/:shortId", HandleAnalytics);
module.exports = router;
