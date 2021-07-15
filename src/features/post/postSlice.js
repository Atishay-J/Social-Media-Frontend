import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { authAxios } from "../../Utils/authAxios";
export const uploadPost = createAsyncThunk(
  "posts/uploadPost",
  async ({
    postContent,
    userId,
    username,
    avatar,
    postImg,
    firstname,
    lastname,
  }) => {
    try {
      const response = await authAxios.post("/createpost", {
        postContent,
        username,
        userId,
        avatar,
        postImg,
        firstname,
        lastname,
      });

      return response.data;
    } catch (err) {
      console.log("Some error occured while creating post ", err);
      return err;
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const response = await authAxios.post("/allposts");

      return response.data;
    } catch (err) {
      console.log("some Error while fetching posts", err);
      return err;
    }
  }
);

const initialState = {
  uploadStatus: "idle",
  postStatus: "idle",
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
      state.uploadStatus = "loading";
    },
    [uploadPost.fulfilled]: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.uploadStatus = "fulfilled";
    },
    [uploadPost.rejected]: (state, action) => {
      state.uploadStatus = "Error";
      state.error = action.error;
    },
    [fetchAllPosts.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.postStatus = "fulfilled";
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.postStatus = "Error";
      state.error = action.error;
    },
  },
});

export const { togglePostLike } = postSlice.actions;

export default postSlice.reducer;
