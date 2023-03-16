import axios from "axios";
import { authService } from "./authService";

const baseURL = "https://om-assignment.onrender.com/api/" ;

let headers = {};
const token = localStorage.getItem("accesstoken");

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers,
});

axiosInstance.interceptors.request.use((request) => {
  if (
    request.method !== "get" &&
    request.method !== "head" &&
    navigator?.serviceWorker?.controller
  ) {
    if (request.data instanceof FormData) {
      navigator?.serviceWorker?.controller?.postMessage({
        body: `${JSON.stringify(request.data)}`,
      });
    } else {
      navigator?.serviceWorker?.controller?.postMessage({ body: request.data });
    }
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      authService.logout();
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
