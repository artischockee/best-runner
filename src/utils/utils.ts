export default class Utils {
  static isObject(value: unknown): boolean {
    if (value === null) return false;

    return typeof value !== "function" && typeof value === "object";
  }

  static getPurifiedObject<
    T extends Record<string, unknown>,
    Q extends Record<string, unknown> & Partial<T>
  >(initialObject: T, alteredObject: Q): Partial<Q> {
    return Object.keys(initialObject).reduce((accumulator, key) => {
      if (!(key in alteredObject)) return accumulator;

      if (this.isObject(alteredObject[key])) {
        return {
          ...accumulator,
          [key]: this.getPurifiedObject(
            initialObject[key] as Record<string, unknown>,
            alteredObject[key] as Record<string, unknown>
          ),
        };
      }

      if (initialObject[key] !== alteredObject[key]) {
        return { ...accumulator, [key]: alteredObject[key] };
      }

      return accumulator;
    }, {});
  }
}
