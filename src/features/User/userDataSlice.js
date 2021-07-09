import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchUserData = createAsyncThunk("user/userData", async () => {
//   const config = {
//     headers: {
//       Authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpYXQiOjE2MjU4MTAyMDV9.lN6DM4oBtCo0kzsU5IIsS_mIjzeK0zqhz9EClT4bwjg",
//     },
//   };

//   // const response = await axios.post("http://localhost:8000/userdata", config);
//   // console.log("response =====> ", response);
//   // return response.data;

//   axios
//     .post("http://localhost:8000/userdata", config)
//     .then((res) => console.log("Reeeesssponse ", res))
//     .catch((err) => console.log("errrerrorr ", err));
// });

const initialState = {
  status: "idle",
  error: null,
  userData: {},
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  // extraReducers: {
  //   [fetchUserData.pending]: (state, action) => {
  //     state.status = "Loading...";
  //   },
  //   [fetchUserData.fulfilled]: (state, action) => {
  //     state.userData = action.payload.userData;
  //     state.status = "fulfilled";
  //   },
  //   [fetchUserData.rejected]: (state, action) => {
  //     state.status = "error";
  //     state.error = action.error.message;
  //   },
  // },
});
// export const { fetchUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
