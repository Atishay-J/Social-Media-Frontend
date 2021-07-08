import { useState } from "react";
import { EditorState } from "draft-js";
import TweetEditor from "./Tweet Editor/TweetEditor";

import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../features/post/postSlice";

import styles from "./createTweet.module.css";

const CreateTweet = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tweetText, setTweetText] = useState();

  const state = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const checkInputs = () => {
    console.log("CHeck input called");
    setTweetText(editorState.getCurrentContent().getPlainText());
    dispatch(increment("Hulaala"));
  };

  return (
    <div className={styles.createTweetContainer}>
      <div className={styles.createTweetWrapper}>
        <img
          className={styles.userAvatar}
          src="https://avatars.dicebear.com/api/micah/alex.svg"
          alt="User Avatar"
        />
        <TweetEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </div>
      <button className={styles.tweetButton} onClick={checkInputs}>
        Tweet
      </button>
    </div>
  );
};
export default CreateTweet;
