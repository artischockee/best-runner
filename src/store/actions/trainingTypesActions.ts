import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/api/api";

const entity = "TrainingTypes";

export const TrainingTypesActionTypes = {
  FETCH_PENDING: `${entity}.FETCH_PENDING`,
  FETCH_SUCCESS: `${entity}.FETCH_SUCCESS`,
  FETCH_FAILURE: `${entity}.FETCH_FAILURE`,
};

export default class TrainingTypesActions {
  static fetchTrainingTypes = createAsyncThunk(
    "trainingTypes/fetch",
    async (params: { firstRequest: boolean } | void, thunkAPI) => {
      thunkAPI.dispatch({
        type: TrainingTypesActionTypes.FETCH_PENDING,
        payload: { isFirstRequest: params != null ? params.firstRequest : false },
      });

      try {
        const response = await Api.getTrainingTypes();

        thunkAPI.dispatch({ type: TrainingTypesActionTypes.FETCH_SUCCESS, payload: response.data });
      } catch {
        thunkAPI.dispatch({ type: TrainingTypesActionTypes.FETCH_FAILURE });
      }
    }
  );
}
