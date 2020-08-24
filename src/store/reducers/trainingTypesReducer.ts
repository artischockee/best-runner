import { createReducer } from "@reduxjs/toolkit";
import { Data } from "../../types/data";
import { TrainingTypesActionTypes } from "../actions/trainingTypesActions";
import { Redux } from "../types";

const initialState: Redux.GenericReducerState<Data.TrainingType[]> = {
  data: [],
  isLoading: false,
  isError: false,
  requestedOnce: false,
};

export type TrainingTypesReducerState = typeof initialState;

const trainingTypesReducer = createReducer(initialState, {
  [TrainingTypesActionTypes.FETCH_PENDING]: (state, action) => ({
    ...state,
    isLoading: true,
    isError: false,
    requestedOnce: action.payload.isFirstRequest,
  }),
  [TrainingTypesActionTypes.FETCH_SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload,
    isLoading: false,
    isError: false,
  }),
  [TrainingTypesActionTypes.FETCH_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
    isError: true,
  }),
});

export default trainingTypesReducer;
