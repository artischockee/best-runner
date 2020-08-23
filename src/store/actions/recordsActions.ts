import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/api/api";

const entity = "Records";

export const RecordsActionTypes = {
  FETCH_PENDING: `${entity}.FETCH_PENDING`,
  FETCH_SUCCESS: `${entity}.FETCH_SUCCESS`,
  FETCH_FAILURE: `${entity}.FETCH_FAILURE`,
};

export default class RecordsActions {
  static fetchRecords = createAsyncThunk("records/fetch", async (_, thunkAPI) => {
    thunkAPI.dispatch({ type: RecordsActionTypes.FETCH_PENDING });

    try {
      const response = await Api.getRecords();

      thunkAPI.dispatch({ type: RecordsActionTypes.FETCH_SUCCESS, payload: response.data });
    } catch {
      thunkAPI.dispatch({ type: RecordsActionTypes.FETCH_FAILURE });
    }
  });
}
