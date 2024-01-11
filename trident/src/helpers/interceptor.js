import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      config.headers.Authorization = `Token ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
