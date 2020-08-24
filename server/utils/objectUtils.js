const ObjectUtils = {
  someObjectArrayNotEmpty(arraysObject) {
    if (typeof arraysObject !== "object" || arraysObject == null) {
      throw new TypeError();
    }

    return Object.values(arraysObject).some((array) => {
      if (!Array.isArray(array)) throw new TypeError();

      return array.length > 0;
    });
  },

  getReducedErrors(errors) {
    if (typeof errors !== "object" || errors == null) return errors;

    return Object.entries(errors).reduce((acc, entry) => {
      if (Array.isArray(entry[1]) && entry[1].length === 0) {
        return acc;
      }
      return { ...acc, [entry[0]]: entry[1] };
    }, {});
  },
};

module.exports = ObjectUtils;
