const express = require("express");
const cors = require("cors");
const recordsRouter = require("./routes/records");
const dictionariesRouter = require("./routes/dictionaries").router;

const app = express();
const port = 5000;

app.use(cors());
app.use("/api/records", recordsRouter);
app.use("/api/dictionaries", dictionariesRouter);

app.listen(port, () => {
  console.log(`BestRunner app server at http://localhost:${port}`);
});
