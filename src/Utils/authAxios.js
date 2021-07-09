import axios from "axios";

const apiURL = "http://localhost:8000";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE2MjU4MTAyMDV9.lN6DM4oBtCo0kzsU5IIsS_mIjzeK0zqhz9EClT4bwjg";

const token = JSON.parse(localStorage.getItem("userData")).token;

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: token,
  },
});
