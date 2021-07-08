import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      console.log("GOT State ", state, "Got Action ", action);
      state.isUserLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },
    signOut: (state, action) => {
      state.isUserLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
