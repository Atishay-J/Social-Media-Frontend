import { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import PostEditor from "./Post Editor/PostEditor";

import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../features/post/postSlice";

import styles from "./createPost.module.css";

const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tweetText, setTweetText] = useState();

  const state = useSelector((state) => state.posts);

  const { userData } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const checkInputs = () => {
    console.log("CHeck input called");
    let postText = editorState.getCurrentContent().getPlainText();
    // setTweetText(editorState.getCurrentContent().getPlainText());
    dispatch(createPost(postText));
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
      <button className={styles.postButton} onClick={checkInputs}>
        Post
      </button>
    </div>
  );
};
export default CreatePost;
