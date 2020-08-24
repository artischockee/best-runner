export default class DateUtils {
  /**
   * @returns {string} like YYYY-mm-DD
   */
  static getTodayDateISO(): string {
    return new Date().toISOString().split("T")[0];
  }

  static getISODate(fullISOString: string): string | null {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(fullISOString)) return null;

    return fullISOString.split("T")[0];
  }
}
