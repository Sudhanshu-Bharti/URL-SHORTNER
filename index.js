const express = require("express");
const urlRoute = require("./routes/url");
const { ConnectMongo } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictTo, checkForAuthentication } = require("./middleware/auth");
const router = require("./routes/url");
const app = express();

const PORT = 2000;

ConnectMongo("mongodb://127.0.0.1:27017/url-shortner").then((err, data) => {
  console.log("MongoDB Connected Successfully");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//   const allURL = await URL.find({});
//   return res.render("home", {
//     urls: allURL,
//   });
// });

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => {
  console.log(`PORT IS LISTENING AT ${PORT}`);
});
