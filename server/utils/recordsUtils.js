const __trainingTypes = require("../routes/dictionaries").trainingTypes;

const RecordsUtils = {
  getRecordPostErrors(body) {
    const errors = {
      date: [],
      type: [],
      mileage: [],
      comments: [],
    };

    if (Number.isNaN(new Date(body.date).getDate())) {
      errors.date.push("errors/records/fields/date/nan");
    }
    if (typeof body.type !== "string") {
      errors.type.push("errors/records/fields/type/wrongType");
    } else if (!__trainingTypes.map((tt) => tt.value).includes(body.type)) {
      errors.type.push("errors/records/fields/type/absent");
    }
    if (!/^(\d+)[,.]?(\d*)$/i.test(body.mileage)) {
      errors.mileage.push("errors/records/fields/mileage/wrongFormat");
    }
    if (typeof body.comments !== "string") {
      errors.comments.push("errors/records/fields/comments/wrongType");
    } else if (body.comments.length > 3000) {
      errors.comments.push("errors/records/fields/comments/tooBig");
    }

    return errors;
  },
};

module.exports = RecordsUtils;
