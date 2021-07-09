import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import "draft-js/dist/Draft.css";

import styles from "./postEditor.module.css";

const hashtagPlugin = createHashtagPlugin({ theme: styles });

const PostEditor = ({ editorState, setEditorState }) => {
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
export default PostEditor;
