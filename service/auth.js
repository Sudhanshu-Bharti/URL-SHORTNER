const jwt = require("jsonwebtoken");
const secret = "qwerty@123";

// const sessionIdToMapUser = new Map();
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  console.log("Token before verification:", token);
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
