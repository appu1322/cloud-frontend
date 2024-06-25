import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import { store } from '../store';
import { updateAuth } from "../slices/authSlice";

export const checkPerimission: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action) && (action.payload as { status: number })?.status === 401) {
      store.dispatch(updateAuth(null));
    } else{
        return next(action)
    }
  }