import { useEffect, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import PostEditor from "./Post Editor/PostEditor";

import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../features/post/postSlice";

import styles from "./createPost.module.css";

const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tweetText, setTweetText] = useState();

  const state = useSelector((state) => state.posts);

  const { userData } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const createPost = () => {
    console.log("create post called");
    let postContent = editorState.getCurrentContent().getPlainText();

    console.log("UserDAta ki Id", userData.username);
    let username = userData.username;
    dispatch(uploadPost({ postContent, username }));

    const newEditorState = EditorState.push(
      editorState,
      ContentState.createFromText("")
    );
    setEditorState(newEditorState);
  };

  useEffect(() => {
    console.log("State ", state);
  }, [state]);

  // useEffect(() => {
  //   console.log("Tweet Text ", tweetText);
  //   dispatch(createPost(tweetText));
  // }, [tweetText]);

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.createPostWrapper}>
        <img
          className={styles.userAvatar}
          src={userData.avatar}
          alt="User Avatar"
        />
        <PostEditor editorState={editorState} setEditorState={setEditorState} />
      </div>
      <button className={styles.postButton} onClick={createPost}>
        Post
      </button>
    </div>
  );
};
export default CreatePost;
