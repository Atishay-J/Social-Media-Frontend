import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import "draft-js/dist/Draft.css";
import { useState } from "react";
import styles from "./tweetEditor.module.css";

const hashtagPlugin = createHashtagPlugin({ theme: styles });

const TweetEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const data = convertToRaw(editorState.getCurrentContent());

  return (
    <div className={styles.editorStyle}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="What's happening?"
        plugins={[hashtagPlugin]}
      />
      <button
        className={styles.tweetButton}
        onClick={() =>
          console.log("Tweet", editorState.getCurrentContent().getPlainText())
        }
      >
        Tweet
      </button>
    </div>
  );
};
export default TweetEditor;
