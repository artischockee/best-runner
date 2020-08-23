const express = require("express");
const __trainingTypes = require("./dictionaries").trainingTypes;

const router = express.Router();

const __records = [
  {
    id: 0,
    date: new Date(2020, 0, 1).toISOString(),
    type: __trainingTypes.cycling,
    mileage: 15.1,
  },
  {
    id: 1,
    date: new Date(2020, 0, 2).toISOString(),
    type: __trainingTypes.running,
    mileage: 10.25,
  },
  {
    id: 2,
    date: new Date(2020, 0, 3).toISOString(),
    type: __trainingTypes.skiing,
    mileage: 20.25,
  },
  {
    id: 3,
    date: new Date(2020, 0, 4).toISOString(),
    type: __trainingTypes.walking,
    mileage: 5,
  },
];

router.get("/", (req, res) => {
  res.json(__records);
});

router.post("/", (req) => {
  console.log("\n\nPOST\n\n", req);
});

// router.put("/", (req, res) => {
// });

// router.delete("/", (req, res) => {
// });

module.exports = router;
