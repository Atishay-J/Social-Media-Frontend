import axios from "axios";

const apiURL = process.env.REACT_APP_SERVER_URL;

// const apiURL = "http://localhost:8000";

const token = localStorage.getItem("token");

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (token) {
  authAxios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");
}
