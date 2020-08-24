import { Data } from "../../types/data";
import http from "./apiConfig";

export default class Api {
  static getRecords() {
    return http.get("records");
  }

  static postRecord(data: Data.RecordPost) {
    return http.post("records", data);
  }

  static getTrainingTypes() {
    return http.get("dictionaries/training-types");
  }
}
