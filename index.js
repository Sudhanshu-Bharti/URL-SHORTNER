const express = require("express");
const urlRoute = require("./routes/url");
const { ConnectMongo } = require("./connect");
const URL = require("./models/url");
const app = express();

const PORT = 2000;

ConnectMongo("mongodb://127.0.0.1:27017/url-shortner").then((err, data) => {
  console.log("MongoDB Connected Successfully");
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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
