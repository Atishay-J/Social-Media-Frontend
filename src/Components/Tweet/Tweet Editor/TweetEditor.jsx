import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import "draft-js/dist/Draft.css";

import styles from "./tweetEditor.module.css";

const hashtagPlugin = createHashtagPlugin({ theme: styles });

const TweetEditor = ({ editorState, setEditorState }) => {
  return (
    <div className={styles.editorStyle}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="What's happening?"
        plugins={[hashtagPlugin]}
      />
    </div>
  );
};
export default TweetEditor;
