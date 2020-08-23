import http from "./apiConfig";

export default class Api {
  static getRecords() {
    return http.get("records");
  }
}
