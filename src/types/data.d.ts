import { Fields as RecordRowFields } from "../components/recordRow/RecordRow";

export declare namespace Data {
  interface TrainingRecord {
    id: number;
    date: string; // ISO
    type: string; // identifier
    mileage: number;
    comments?: string;
  }

  type TrainingRecordGetParams = Partial<Record<keyof RecordRowFields, "asc" | "desc">>;

  type TrainingRecordPost = Omit<TrainingRecord, "id">;

  interface TrainingType {
    id: number;
    value: string;
  }
}
