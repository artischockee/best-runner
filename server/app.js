const path = require("path");
const express = require("express");
const cors = require("cors");
const recordsRouter = require("./routes/records");
const dictionariesRouter = require("./routes/dictionaries").router;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(__dirname + "/"));
app.use("/api/records", recordsRouter);
app.use("/api/dictionaries", dictionariesRouter);

app.listen(port);
