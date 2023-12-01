const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function ConnectMongo(url) {
  return mongoose.connect(url);
}

module.exports = {
  ConnectMongo,
};
