import { createSlice } from "@reduxjs/toolkit";

let initUserData = localStorage.getItem("token");

const initialState = {
  isUserLoggedIn: initUserData ? true : false,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isUserLoggedIn = true;
    },
    signOut: (state, action) => {
      state.isUserLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
