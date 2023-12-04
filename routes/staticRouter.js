const express = require("express");

const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allURL = await URL.find({});
  return res.render("home", {
    urls: allURL,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const allURL = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
      urls: allURL,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;

//home- previous body:
// <!-- <h1>Hi from server</h1>
// <% urls.forEach(url => { %>
// <li><%= url.shortId %></li>
// <% }) %> -->
