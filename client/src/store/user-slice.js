import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: [],
  message: "",
  newUserData: {},
  userById: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.usersData = action.payload.data;
      state.message = action.payload.message;
    },
    addUserDetails(state, action) {
      state.newUserData = action.payload.data;
      state.message = action.payload.message;
    },
    deleteUser(state, action) {
      state.message = action.payload.message;
    },
    getUserById(state, action) {
      state.message = action.payload.message;
      state.userById = action.payload.data;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
