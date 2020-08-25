import { RecordTable } from "./types";
import RecordTableConstants from "./RecordTableConstants";

export default class RecordTableUtils {
  static tableColsSortReducer(
    state: RecordTable.TableColsSortState,
    action: RecordTable.TableColsSortActions
  ): RecordTable.TableColsSortState {
    switch (action.type) {
      case "SWITCH_ORDER":
        return {
          ...RecordTableConstants.tableColsSortInitialState,
          [action.colName]: action.payload,
        };
      default:
        throw new Error();
    }
  }
}
