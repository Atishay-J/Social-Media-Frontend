import { createSlice } from "@reduxjs/toolkit";

let initUserData = localStorage.getItem("token");

const initialState = {
  isUserLoggedIn: initUserData ? true : false,
  authUserData: "",
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      // let userData = {
      //   isUserLoggedIn: true,
      //   token: action.payload.token,
      // };
      localStorage.setItem("token", action.payload.token);
      state.isUserLoggedIn = true;
    },
    signOut: (state, action) => {
      state.isUserLoggedIn = false;
      localStorage.removeItem("userData");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
