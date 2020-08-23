import { combineReducers } from "@reduxjs/toolkit";
import recordsReducer from "./recordsReducer";

const rootReducer = combineReducers({
  records: recordsReducer,
});

export default rootReducer;
