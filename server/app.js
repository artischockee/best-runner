const path = require("path");
const express = require("express");
const cors = require("cors");
const recordsRouter = require("./routes/records");
const dictionariesRouter = require("./routes/dictionaries").router;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  if (req.get("Referer") == null) return res.redirect("/");
  next();
});
apiRouter.use("/records", recordsRouter);
apiRouter.use("/dictionaries", dictionariesRouter);

app.use("/api", apiRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port);
