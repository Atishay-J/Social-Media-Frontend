import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAxios } from "../../Utils/authAxios";
export const uploadPost = createAsyncThunk(
  "posts/uploadPost",
  async ({ postContent, username }) => {
    console.log("Upload Post called", postContent, username);
    try {
      const response = await authAxios.post("/createpost", {
        postContent,
        username,
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
    createPost: (state, action) => {
      console.log("Create POst Action", state);
      state.posts = [...state.posts, { tweet: action.payload }];
    },
  },
  extraReducers: {
    [uploadPost.pending]: (state, action) => {
      state.status = "Loading...";
    },
    [uploadPost.fulfilled]: (state, action) => {
      console.log("Post ka payload ====>>", action);
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
      console.log("Feed ka payload ====>>", action);
      state.posts = action.payload;
      state.status = "fulfilled";
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.status = "Error";
      state.error = action.error;
    },
  },
});

export const { createPost } = postSlice.actions;

export default postSlice.reducer;