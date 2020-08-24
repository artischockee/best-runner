const express = require("express");
const { getReducedErrors, someObjectArrayNotEmpty } = require("../utils/objectUtils");
const { getRecordPostErrors } = require("../utils/recordsUtils");
const __trainingTypes = require("./dictionaries").trainingTypes;

const router = express.Router();

let __records = [
  {
    id: 0,
    date: new Date("2020-01-01").toISOString(),
    type: __trainingTypes[0].id,
    mileage: 15.1,
    comments: "",
  },
  {
    id: 1,
    date: new Date("2020-02-02").toISOString(),
    type: __trainingTypes[1].id,
    mileage: 10.25,
    comments: "",
  },
  {
    id: 2,
    date: new Date("2020-03-03").toISOString(),
    type: __trainingTypes[2].id,
    mileage: 20.25,
    comments: "",
  },
  {
    id: 3,
    date: new Date("2020-04-04").toISOString(),
    type: __trainingTypes[3].id,
    mileage: 5,
  },
];

router.get("/", (req, res) => {
  res.json(__records);
});

router.post("/", (req, res) => {
  const errors = getRecordPostErrors(req.body);

  if (someObjectArrayNotEmpty(errors)) {
    return res.status(400).json({ errors: getReducedErrors(errors) });
  }

  const newRecord = {
    id: __records[__records.length - 1].id + 1,
    date: new Date(req.body.date).toISOString(),
    type: __trainingTypes.find((tt) => tt.value === req.body.type).id,
    mileage: Number(req.body.mileage.replace(/^(\d+),?(\d*)$/i, "$1.$2")),
    comments: req.body.comments,
  };

  __records.push(newRecord);

  res.status(201).send(newRecord);
});

// router.put("/", (req, res) => {
// });

router.delete("/:recordId", (req, res) => {
  if (req.params.recordId == null) {
    return res.status(404).send();
  }

  try {
    __records = __records.filter((record) => record.id !== Number(req.params.recordId));
  } catch {
    return res.status(500).send();
  }

  res.status(204).send();
});

module.exports = router;
