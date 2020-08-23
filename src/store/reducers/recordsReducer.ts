import { createReducer } from "@reduxjs/toolkit";
import { Data } from "../../types/data";
import { RecordsActionTypes } from "../actions/recordsActions";

const initialState = {
  data: [] as Data.Record[],
  isLoading: false,
  isError: false,
};

const recordsReducer = createReducer(initialState, {
  [RecordsActionTypes.FETCH_PENDING]: (state) => ({
    ...state,
    isLoading: true,
    isError: false,
  }),
  [RecordsActionTypes.FETCH_SUCCESS]: (_, action) => ({
    data: action.payload,
    isLoading: false,
    isError: false,
  }),
  [RecordsActionTypes.FETCH_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
    isError: true,
  }),
});

export default recordsReducer;
