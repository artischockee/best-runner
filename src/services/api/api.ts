import { Data } from "../../types/data";
import http from "./apiConfig";

export default class Api {
  static getRecords(params?: Data.TrainingRecordGetParams) {
    return http.get("records", { params });
  }

  static postRecord(data: Data.TrainingRecordPost) {
    return http.post("records", data);
  }

  static putRecord(recordId: number, data: Data.TrainingRecordPost) {
    return http.put(`records/${recordId}`, data);
  }

  static deleteRecord(recordId: number) {
    return http.delete(`records/${recordId}`);
  }

  static getTrainingTypes() {
    return http.get("dictionaries/training-types");
  }
}
