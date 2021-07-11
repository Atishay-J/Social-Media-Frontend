import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { authAxios } from "../../Utils/authAxios";

export const fetchLoggedInUserData = createAsyncThunk(
  "user/userData",

  async (userData, { rejectWithValue }) => {
    try {
      console.log("LOcal Value is ", localStorage.getItem("userData"));
      const response = await authAxios.post("/userdata");
      console.log("Ressssssssssss ====>>", response);
      return response.data;
    } catch (err) {
      if (!err.response) {
        console.log("THHHRRROWIING ERRORR");
        throw err;
      }
      console.log("THHHRRROWIING CCAATTHH ERRORR", err);
      return rejectWithValue(err.response.data);
    }
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
  reducers: {
    toggleFollow: (state, action) => {
      console.log("Follow Slice ", action.payload, current(state));
      if (state.userData.following) {
        state.userData.following = [
          ...state.userData.following,
          action.payload,
        ];
      } else {
        fetchLoggedInUserData();
      }
    },
  },
  extraReducers: {
    [fetchLoggedInUserData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLoggedInUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      console.log("Pushed Data ====> ", state.userData);
      state.status = "fulfilled";
    },
    [fetchLoggedInUserData.rejected]: (state, action) => {
      console.log("User data reducer Action ===>", action.payload);
      state.status = "error";
      state.error = action.payload.message;
      // state.error = action.error.message;
    },
  },
});
export const { toggleFollow } = userDataSlice.actions;
export default userDataSlice.reducer;
