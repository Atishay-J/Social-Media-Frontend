import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  posts: [
    {
      postId: "234Hf",
      tweet: "hello world",
      userId: "333444",
      userName: "Alex",
    },
  ],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      console.log("Create POst Action", state);
      state.posts = [...state.posts, { tweet: action.payload }];
    },
  },
});

export const { createPost } = postSlice.actions;

export default postSlice.reducer;
