import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import { useState } from "react";

import styles from "./createTweet.module.css";
import "draft-js/dist/Draft.css";

const hashtagPlugin = createHashtagPlugin({ theme: styles });

const CreateTweet = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className={styles.createTweetContainer}>
      <img
        className={styles.userAvatar}
        src="https://avatars.dicebear.com/api/micah/alex.svg"
        alt="User Avatar"
      />
      <div className={styles.editorStyle}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="What's happening?"
          plugins={[hashtagPlugin]}
        />
      </div>
    </div>
  );
};
export default CreateTweet;
