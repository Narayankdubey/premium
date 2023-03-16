import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";

import axios from "../helpers/axiosInstance";
import { handleError } from "./login-actions";

export const getUserDetails = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.get("/users");
      dispatch(userActions.setUserDetails(data.data));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const addUserDetails = (body) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.post("/users", body);
      dispatch(userActions.addUserDetails(data.data));
      await dispatch(
        uiActions.showNotification({
          status: "success",
          message: data.data.message,
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

export const delUserDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.delete("/users/" + id);
      dispatch(userActions.deleteUser(data.data));
      await dispatch(
        uiActions.showNotification({
          status: "success",
          message: data.data.message,
        })
      );
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getUserDetailsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.get("/users/" + id);
      dispatch(userActions.getUserById(data.data));
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const updateUserById = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.toggleLoader());
      const data = await axios.patch("/users/" + id, body);
      dispatch(userActions.addUserDetails(data.data));
      await dispatch(
        uiActions.showNotification({
          status: "success",
          message: data.data.message,
        })
      );
    } catch (error) {
      handleError(dispatch, error);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
