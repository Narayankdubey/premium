import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      window.location.replace("");
    },
  },
});

export const userActions = loginSlice.actions;

export default loginSlice;
