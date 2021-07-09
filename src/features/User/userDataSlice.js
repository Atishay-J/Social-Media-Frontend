import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authAxios } from "../../Utils/authAxios";

export const fetchUserData = createAsyncThunk(
  "user/userData",
  // async () => {
  //   const response = await authAxios.post("/userdata");
  //   console.log("REsponse from Thunk", response);
  //   return response.data;
  // }

  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post("/userdata");
      console.log("Ressssssssssss ====>>", response);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }

    // const response = await authAxios.post("/userdata");
    // console.log("response ", response);
    // return response.data;
  }
);

const initialState = {
  status: "idle",
  error: null,
  userData: {},
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserData.pending]: (state, action) => {
      state.status = "Loading...";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      console.log("Pushed Data ====> ", state.userData);
      state.status = "fulfilled";
    },
    [fetchUserData.rejected]: (state, action) => {
      console.log("User data reducer Action ===>", action.payload);
      state.status = "error";
      state.error = action.payload.message;
      // state.error = action.error.message;
    },
  },
});
// export const { fetchUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
