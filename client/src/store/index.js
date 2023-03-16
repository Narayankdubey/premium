import premiumSlice from "./premium-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";

export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    premium: premiumSlice.reducer,
  },
});
