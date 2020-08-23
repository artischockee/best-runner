import { Redux } from "../types";

export default class RecordsSelectors {
  static records = (state: Redux.RootState) => state.records;
}
