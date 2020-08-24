import { combineReducers } from "@reduxjs/toolkit";
import recordsReducer from "./recordsReducer";
import trainingTypesReducer from "./trainingTypesReducer";

const rootReducer = combineReducers({
  records: recordsReducer,
  trainingTypes: trainingTypesReducer,
});

export default rootReducer;
