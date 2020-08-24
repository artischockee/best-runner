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
    comments: "I love running! My heart is strong and my muscles are well trained",
  },
  {
    id: 1,
    date: new Date("2020-02-02").toISOString(),
    type: __trainingTypes[1].id,
    mileage: 10.25,
    comments: "Cycling is fun - I can ride a bike all the day long",
  },
  {
    id: 2,
    date: new Date("2020-03-03").toISOString(),
    type: __trainingTypes[2].id,
    mileage: 20.25,
    comments: "When I do skiing, I always take warm clothes and thermos full of hot tea",
  },
  {
    id: 3,
    date: new Date("2020-04-04").toISOString(),
    type: __trainingTypes[3].id,
    mileage: 5,
    comments:
      "There is no any thing simpler than walking, which is available for almost every person on the planet",
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

router.put("/:recordId", (req, res) => {
  if (req.params.recordId == null) {
    return res.status(404).send();
  }

  let updatedRecord = {};

  try {
    const recordId = Number(req.params.recordId);

    __records = __records.map((record) => {
      if (record.id !== recordId) return record;

      const { body } = req;

      updatedRecord = {
        ...record,
        date: body.date != null ? new Date(body.date).toISOString() : record.date,
        type: body.type != null ? Number(body.type) : record.type,
        mileage:
          body.mileage != null
            ? Number(body.mileage.replace(/^(\d+),?(\d*)$/i, "$1.$2"))
            : record.mileage,
        comments: body.comments || record.comments,
      };

      return updatedRecord;
    });
  } catch (e) {
    return res.status(500).send();
  }

  res.status(200).send(updatedRecord);
});

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
