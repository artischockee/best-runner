const express = require("express");

const router = express.Router();

const __trainingTypes = [
  {
    id: 0,
    value: "running",
  },
  {
    id: 1,
    value: "cycling",
  },
  {
    id: 2,
    value: "skiing",
  },
  {
    id: 3,
    value: "walking",
  },
];

router.get("/training-types", (req, res) => {
  res.send(__trainingTypes);
});

module.exports = {
  router: router,
  trainingTypes: __trainingTypes,
};
