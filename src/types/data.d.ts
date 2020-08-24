export declare namespace Data {
  interface Record {
    id: number;
    date: string; // ISO
    type: string; // identifier
    mileage: number;
    comments?: string;
  }

  type RecordPost = Omit<Record, "id">;

  interface TrainingType {
    id: number;
    value: string;
  }
}
