import axios from "axios";

// const apiURL = "https://socialmetaphor.herokuapp.com";

const apiURL = "http://localhost:8000";

const token = JSON.parse(localStorage.getItem("userData"))?.token;

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: token,
  },
});
