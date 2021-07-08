import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  posts: [
    {
      postId: "234Hf",
      postCaption: "hello world",
      userId: "333444",
      userName: "Alex",
    },
  ],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    increment: (state, action) => {
      //   state.value += 1;
      console.log("AAActionnn", action);
      state.value = action.payload;
    },
  },
});

export const { increment } = postSlice.actions;

export default postSlice.reducer;
