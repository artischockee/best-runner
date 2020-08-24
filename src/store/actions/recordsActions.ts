import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/api/api";
import { Data } from "../../types/data";

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

  static createRecord = createAsyncThunk(
    "records/create",
    async (data: Data.RecordPost, { rejectWithValue }) => {
      try {
        const response = await Api.postRecord(data);

        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
  );

  static editRecord = createAsyncThunk(
    "records/edit",
    async (payload: { recordId: number; data: Data.RecordPost }, { rejectWithValue }) => {
      try {
        const response = await Api.putRecord(payload.recordId, payload.data);

        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
  );

  static deleteRecord = createAsyncThunk(
    "records/delete",
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await Api.deleteRecord(id);

        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
  );
}
