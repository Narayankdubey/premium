import { uiActions } from "./ui-slice";
import { premiumActions } from "./premium-slice";

import axios from "../helpers/axiosInstance";
import { handleError } from "./login-actions";

export const getPremiumDetailsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.get("/premium/" + id);
      dispatch(premiumActions.setPremiumDetails(data));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const updatePremiumById = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      await axios.post("/premium/" + id, body);
      // await dispatch(
      //   uiActions.showNotification({
      //     status: "success",
      //     message: "successfully created",
      //   })
      // );
      return true;
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getCalculatedPremium = (id) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.get("/calculatedPremium/" + id);
      dispatch(premiumActions.setcalculatedPremium(data.data));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
