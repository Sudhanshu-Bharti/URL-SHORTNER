const express = require("express");
const { HandleUserSignup, HandleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", HandleUserSignup);
router.post("/login", HandleUserLogin);
module.exports = router;
