const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
async function HandleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.render("home");
}

async function HandleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });
  // console.log("User", user);
  if (!user) return res.render("login", { error: "Invalid Login credentials" });

  //setting up cookies
  const sessionID = uuidv4();
  setUser(sessionID, user);
  res.cookie("uid", sessionID);
  console.log(req);
  return res.redirect("/");
}

module.exports = { HandleUserSignup, HandleUserLogin };
