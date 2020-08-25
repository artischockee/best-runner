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
          type: state.type,
          [action.colName]: action.payload,
        };
      case "SET_FILTER":
        return {
          ...state,
          ...action.payload,
        };
      case "RESET_FILTER":
        return {
          ...state,
          type: null,
        };
      default:
        throw new Error();
    }
  }
}
