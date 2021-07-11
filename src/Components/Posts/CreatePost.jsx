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

  const state = useSelector((state) => state.posts);

  const { loggedInUserData } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const createPost = () => {
    let postContent = editorState.getCurrentContent().getPlainText();

    let username = loggedInUserData.username;
    let avatar = loggedInUserData.avatar;

    console.log("loggedInUserData on Create POst ", loggedInUserData);

    dispatch(uploadPost({ postContent, username, avatar }));

    const newEditorState = EditorState.push(
      editorState,
      ContentState.createFromText("")
    );
    setEditorState(newEditorState);
  };

  useEffect(() => {
    console.log("State ", state);
  }, [state]);

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.createPostWrapper}>
        <img
          className={styles.userAvatar}
          src={loggedInUserData.avatar}
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
