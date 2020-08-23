const express = require("express");

const router = express.Router();

const __trainingTypes = {
  running: "running",
  cycling: "cycling",
  skiing: "skiing",
  walking: "walking",
};

router.get("/dictionaries", (req, res) => {
  res.json(__trainingTypes);
});

module.exports = {
  router: router,
  trainingTypes: __trainingTypes,
};
