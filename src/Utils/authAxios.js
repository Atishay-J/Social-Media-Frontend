import axios from "axios";

// const apiURL = "https://socialmetaphor.herokuapp.com";

const apiURL = "http://localhost:8000";

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
