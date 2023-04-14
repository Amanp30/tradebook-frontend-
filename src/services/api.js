import axios from "axios";
import { getToken } from "../helpers/Auth";

const api = axios.create({
  baseURL: `${REACT_APP_API}`,
  withCredentials: true, // send cookies with requests
});

// Add XSRF-TOKEN header to all POST, PUT, DELETE requests
api.interceptors.request.use((config) => {
  // use this for csruf protection
  //   const xsrfToken = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
  //   if (xsrfToken) {
  //     config.headers["X-XSRF-TOKEN"] = xsrfToken[1];
  //   }

  var token = getToken();
  if (getToken()) {
    config.headers.Authorization = `Bearer ${token.toString()}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";

  return config;
});

export default api;
