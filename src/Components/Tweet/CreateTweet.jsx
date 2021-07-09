import { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import TweetEditor from "./Tweet Editor/TweetEditor";

import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../features/post/postSlice";
import { fetchUserData } from "../../features/User/userDataSlice";

import styles from "./createTweet.module.css";
import axios from "axios";
import { authAxios } from "../../Utils/authAxios";

const CreateTweet = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tweetText, setTweetText] = useState();

  const state = useSelector((state) => state.posts);

  const { userData, status, error } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const checkInputs = () => {
    console.log("CHeck input called");
    setTweetText(editorState.getCurrentContent().getPlainText());
    dispatch(increment("Hulaala"));
  };

  const fetchingData = async () => {
    const data = await authAxios
      .post("/userdata")
      .then((res) => console.log("RESSSS ", res))
      .catch((err) => console.log("ERRRRRO", err.response));
    // console.log("DDaaaaAATTTAAAA ", data);
  };

  useEffect(() => {
    fetchingData();
  }, []);

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
