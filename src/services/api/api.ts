import { Data } from "../../types/data";
import http from "./apiConfig";

export default class Api {
  static getRecords() {
    return http.get("records");
  }

  static postRecord(data: Data.RecordPost) {
    return http.post("records", data);
  }

  static deleteRecord(recordId: number) {
    return http.delete(`records/${recordId}`);
  }

  static getTrainingTypes() {
    return http.get("dictionaries/training-types");
  }
}
