export default class CommonUtils {
  static getAllMatchesByRegExp(regExp: RegExp, string: string) {
    let innerRegExp = regExp;

    if (!innerRegExp.flags.includes("g")) {
      innerRegExp = new RegExp(innerRegExp.source, innerRegExp.flags + "g");
    }

    const result = [];

    let match;
    do {
      match = innerRegExp.exec(string);
      if (match) {
        result.push([match[0], match[1]]);
      }
    } while (match);

    return result;
  }

  static trimRepeatingSlashes(string: string) {
    const regExp = /(\/\/)|(\\\\)/g;

    return string.replace(regExp, (substring) => substring[0]);
  }

  static trimUrlRepeatingSlashes(urlString: string) {
    try {
      const url = new URL(urlString);
      const string = this.trimRepeatingSlashes(url.pathname);

      return url.origin + string;
    } catch (error) {
      console.error(error);
      return urlString;
    }
  }

  static timeout(delayMs = 0) {
    return new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  static getPurifiedObject(object: Record<string, unknown>) {
    return Object.entries(object).reduce((acc, entry) => {
      if (entry[1] == null) return acc;

      return { ...acc, [entry[0]]: entry[1] };
    }, {});
  }

  static convertEmptyStringFieldsToNull<T extends Record<string, unknown>>(object: T): any {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return { ...acc, [key]: value === "" ? null : value };
    }, {});
  }
}
