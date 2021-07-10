import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { authAxios } from "../../Utils/authAxios";
export const uploadPost = createAsyncThunk(
  "posts/uploadPost",
  async ({ postContent, username, avatar }) => {
    console.log("Upload Post called", postContent, username);
    try {
      const response = await authAxios.post("/createpost", {
        postContent,
        username,
        avatar,
      });
      console.log(" New POst Created Data", response);
      return response.data;
    } catch (err) {
      console.log("Errorr aa gya bhaagooo ", err);
      return err;
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    console.log("Fetching Alll Posts");
    try {
      const response = await authAxios.post("/allposts");
      console.log("Fetch Post Response ", response);
      return response.data;
    } catch (err) {
      console.log("Fetch krne pr error aaya", err);
      return err;
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    togglePostLike: (state, action) => {
      let foundPost = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      let remainingPosts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );

      if (foundPost) {
        let ifAlreadyLiked = foundPost.likes.find(
          (likedby) => likedby === action.payload.username
        );
        if (ifAlreadyLiked) {
          let removeLike = foundPost.likes.filter(
            (likedby) => likedby !== action.payload.username
          );

          foundPost.likes = removeLike;
        } else {
          foundPost.likes = [...foundPost.likes, action.payload.username];
        }
      }

      state.posts = [...remainingPosts, foundPost];
    },
  },
  extraReducers: {
    [uploadPost.pending]: (state, action) => {
      state.status = "Loading...";
    },
    [uploadPost.fulfilled]: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.status = "fulfilled";
    },
    [uploadPost.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error;
    },
    [fetchAllPosts.pending]: (state, action) => {
      state.status = "Loading...";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "fulfilled";
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error;
    },
  },
});

export const { togglePostLike } = postSlice.actions;

export default postSlice.reducer;
