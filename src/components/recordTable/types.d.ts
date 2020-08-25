export declare namespace RecordTable {
  interface TableColsSortState<T = "asc" | "desc" | null> {
    date: T;
    mileage: T;
  }

  type TableColsSortActions<T = "asc" | "desc"> = {
    type: "SWITCH_ORDER";
    colName: keyof TableColsSortState;
    payload: T;
  };
}
