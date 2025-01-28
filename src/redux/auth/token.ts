import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  closeCircularProgress,
  openCircularProgress,
} from "../uireducers/progress";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../common";

interface AccessRequest {
  token: string;
}

export const getToken = createAsyncThunk<string, string>(
  "auth/getToken",

  async (data, { dispatch }) => {
    dispatch(openCircularProgress());

    return await new Promise<string>((resolve) => {
      let token: string = getFromLocalStorage("fb-auth-token");

      setTimeout(() => {
        dispatch(closeCircularProgress());
        resolve(token);
      }, 1000);
    });
  },
);

export const setToken = createAsyncThunk<string, AccessRequest>(
  "auth/setToken",

  async ({ token }: AccessRequest, { dispatch }) => {
    dispatch(openCircularProgress());

    return await new Promise<string>((resolve) => {
      saveToLocalStorage("fb-auth-token", token);

      setTimeout(() => {
        dispatch(closeCircularProgress());
        resolve(token);
      }, 1000);
    });
  },
);

export const removeToken = createAsyncThunk<string, { action: string }>(
  "auth/removeTOken",

  async ({ action }: { action: string }, { dispatch }) => {
    dispatch(openCircularProgress());

    return await new Promise<string>((resolve) => {
      removeFromLocalStorage("fb-auth-token");

      setTimeout(() => {
        dispatch(closeCircularProgress());
        resolve("LOGOUT");
      }, 1000);
    });
  },
);

interface Access {
  token: string;
}

const initialState: Access = {
  token: getFromLocalStorage("fb-auth-token"),
};

const slice = createSlice({
  name: "access",
  initialState,
  reducers: {},
  extraReducers: {
    [`${getToken.fulfilled}`]: (state, { payload }) => {
      state.token = payload;
    },

    [`${setToken.fulfilled}`]: (state, { payload }) => {
      state.token = payload;
    },

    [`${removeToken.fulfilled}`]: (state, { payload }) => {
      state.token = "";
    },
  },
});

export default slice.reducer;
