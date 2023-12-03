const { getUser } = require("../service/auth");

async function restrictLoggedInUser(req, res, next) {
  const userUId = req.cookies?.uid;

  if (!userUId) return res.redirect("/login");
  console.log("user not found1");
  const user = getUser(userUId);

  if (!user) return res.redirect("/login");
  console.log("user not found2");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUId = req.cookies?.uid;

  const user = getUser(userUId);

  req.user = user;
  next();
}

module.exports = {
  restrictLoggedInUser,
  checkAuth,
};
