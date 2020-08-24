export default class DateUtils {
  /**
   * @returns {string} like YYYY-mm-DD
   */
  static getTodayDateISO(): string {
    return new Date().toISOString().split("T")[0];
  }
}
