import { createSlice } from "@reduxjs/toolkit";

let initUserData = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  isUserLoggedIn: initUserData?.isUserLoggedIn ? true : false,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      let userData = {
        isUserLoggedIn: true,
        token: action.payload.token,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
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
