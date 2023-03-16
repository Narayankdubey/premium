import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  premiumData: {
    dob: "",
    gender: "male",
    sumAssured: "",
    modalPremium: "",
    premiumFrequency: "Yearly",
    pt: "",
    ppt: "",
  },
  calculatedPremium: [],
};
const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    setPremiumDetails(state, action) {
      state.premiumData = action.payload.data;
    },
    setcalculatedPremium(state, action) {
      state.calculatedPremium = action.payload;
    },
  },
});

export const premiumActions = premiumSlice.actions;

export default premiumSlice;
