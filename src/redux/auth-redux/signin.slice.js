import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLogin } from "../../helpers";

const initialState = {
  isLoading: false,
  error: null,
  admin: undefined,
};

export const authUser = createAsyncThunk("user/signin", async (data) => {
  return await handleLogin(data);
});

export const authSlice = createSlice({
  name: "user/signin",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.admin = undefined;
    },
  },
  extraReducers: {
    [authUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [authUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.admin = payload;
    },
    [authUser.rejected]: (state, action) => {
      state.error = "Parol yoki Login xato kiritildi!";
      state.isLoading = false;
    },
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
