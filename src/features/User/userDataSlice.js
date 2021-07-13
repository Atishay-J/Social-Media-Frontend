import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { authAxios } from "../../Utils/authAxios";

export const fetchLoggedInUserData = createAsyncThunk(
  "user/loggedInUserData",

  async (userData, { rejectWithValue }) => {
    try {
      console.log("LOcal Value is ", localStorage.getItem("token"));
      authAxios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      const response = await authAxios.post("/userdata");
      console.log("Ressssssssssss ====>>", response);
      return response.data;
    } catch (err) {
      if (!err.response) {
        console.log("Some Problem With Database");
        throw err;
      }
      console.log("THHHRRROWIING CCAATTHH ERRORR", err);
      return rejectWithValue(err.response.data || "Error Connecting to Server");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/userData",
  async (username) => {
    console.log("Fetching User Data ", username);
    try {
      const response = await authAxios.post("/finduser", { username });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  loggedInUserStatus: "idle",
  userDataStatus: "idle",
  error: null,
  loggedInUserData: {},
  userData: {},
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    toggleFollow: (state, action) => {
      console.log("Follow Slice ", action.payload, current(state));
      if (state.loggedInUserData.following) {
        console.log("FFFFOOFFOFOFOFOFKMFOMSPDFM");

        let following = state.loggedInUserData.following.find(
          (following) => following === action.payload
        );

        if (following) {
          console.log("REMOVE FFOOLLWING ", following);
          let unfollow = state.loggedInUserData.following.filter(
            (following) => following !== action.payload
          );
          state.loggedInUserData.following = unfollow;
        } else {
          console.log("ADDing TO foolowing");

          state.loggedInUserData.following = [
            ...state.loggedInUserData.following,
            action.payload,
          ];
        }
      } else {
        fetchLoggedInUserData();
      }
    },
    resetUserData: (state, action) => {
      console.log("Resetting UserData");
      state.userDataStatus = "idle";
      state.userData = {};
    },
  },
  extraReducers: {
    [fetchLoggedInUserData.pending]: (state, action) => {
      state.loggedInUserStatus = "loading";
    },
    [fetchLoggedInUserData.fulfilled]: (state, action) => {
      state.loggedInUserData = action.payload;
      console.log("Pushed Data ====> ", state.loggedInUserData);
      state.loggedInUserStatus = "fulfilled";
    },
    [fetchLoggedInUserData.rejected]: (state, action) => {
      console.log("User data reducer Action ===>", action.payload);
      state.loggedInUserStatus = "error";
      state.error = action.payload?.message || "Error Connecting to Server";
      // state.error = action.error.message;
    },
    [fetchUserData.pending]: (state, action) => {
      state.userDataStatus = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      console.log("Pushed Data ====> ", state.userData);
      state.userDataStatus = "fulfilled";
    },
    [fetchUserData.rejected]: (state, action) => {
      console.log("User data reducer Action ===>", action.payload);
      state.userDataStatus = "error";
      state.error = action.payload.message;
      // state.error = action.error.message;
    },
  },
});
export const { toggleFollow, resetUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
