export declare namespace RecordTable {
  interface TableColsSortState<T = "asc" | "desc" | null> {
    date: T;
    mileage: T;
    type?: string | null;
  }

  interface TableFilterableCols<T = string | null> extends Record<string, T> {
    type: T;
  }

  type TableColsSortActions<T = "asc" | "desc"> =
    | {
        type: "SWITCH_ORDER";
        colName: keyof TableColsSortState;
        payload: T;
      }
    | {
        type: "SET_FILTER";
        payload: TableFilterableCols;
      }
    | {
        type: "RESET_FILTER";
      };
}
