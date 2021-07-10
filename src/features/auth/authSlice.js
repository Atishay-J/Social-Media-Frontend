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
      state.isUserLoggedIn = true;
      let userData = {
        isUserLoggedIn: state.isUserLoggedIn,
        token: action.payload.token,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    signOut: (state, action) => {
      state.isUserLoggedIn = false;
      localStorage.removeItem("userData");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
