import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import authReducer from "../features/auth/authSlice";
import userDataReducer from "../features/User/userDataSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    userData: userDataReducer,
  },
});
