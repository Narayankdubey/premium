import { uiActions } from "./ui-slice";
import { userActions } from "./login-slice";

import axios from "../helpers/axiosInstance";
import { authService } from "../helpers/authService";

export const authenticateUser = (body) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.post("/login", body);
      axios.defaults.headers.Authorization = `Bearer ${data.data.token}`;
      authService.setAccessToken(data.data.token);
      authService.setUserDetails(JSON.stringify(data.data));
      dispatch(
        userActions.setUserDetails({
          user: data.data || {},
        })
      );
      return true;
    } catch (error) {
      handleError(dispatch, error);
      return false;
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const handleError = (dispatch, error) => {
  let err = "API Server is not working!";
  console.log(error.response.status)
  if (error.response) {
    err = error.response.data;
  }
  if (error.response.status !== 444) {
    dispatch(
      uiActions.showNotification({
        status: "error",
        message: err,
      })
    );
  }
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const logout = async () => {
        const response = await axios.post("/logout");
        return response;
      };
      await logout();
      authService.logout();
      dispatch(
        userActions.setUserDetails({
          user: {},
        })
      );
    } catch (error) {
      handleError(dispatch, error, authenticateUser);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

