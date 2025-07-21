import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatty-socket-io.onrender.com/api/v1",
  withCredentials: true,
});