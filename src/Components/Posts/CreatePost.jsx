import { useEffect, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import PostEditor from "./Post Editor/PostEditor";

import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../features/post/postSlice";
import { IKImage, IKContext, IKUpload } from "imagekitio-react";
import { Upload } from "react-bootstrap-icons";

import styles from "./createPost.module.css";

const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [showUploadBtn, setShowUploadBtn] = useState(false);

  const state = useSelector((state) => state.posts);

  const { loggedInUserData } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const createPost = () => {
    let postContent = editorState.getCurrentContent().getPlainText();

    let username = loggedInUserData.username;
    let avatar = loggedInUserData.avatar;

    console.log("loggedInUserData on Create POst ", loggedInUserData);

    dispatch(
      uploadPost({ postContent, username, avatar, postImg: imageUploadUrl })
    );

    const newEditorState = EditorState.push(
      editorState,
      ContentState.createFromText("")
    );
    setEditorState(newEditorState);
    setImageUploadUrl("");
    setShowUploadBtn(false);
  };

  useEffect(() => {
    console.log("State ", state);
  }, [state]);

  const onError = (err) => {
    console.log("IMAGE UPLOAD Error");
    console.log(err);
  };

  const onSuccess = (res) => {
    console.log("IMAGE UPLOAD Success");
    console.log(res);
    setImageUploadUrl(res.url);
  };

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

      <IKContext
        publicKey={process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY}
        urlEndpoint={process.env.REACT_APP_IMAGE_KIT_URL_ENDPOINT}
        transformationPosition="path"
        authenticationEndpoint="http://localhost:8000/uploadimage"
      >
        <div className={styles.buttonsWrapper}>
          {showUploadBtn ? (
            <IKUpload
              className={styles.imageKitUpload}
              onError={onError}
              onSuccess={onSuccess}
              useUniqueFileName={true}
              folder={"/socialMedia"}
            />
          ) : (
            <Upload
              className={styles.uploadBtnIcon}
              onClick={() => setShowUploadBtn(true)}
            />
          )}

          <button className={styles.postButton} onClick={createPost}>
            Post
          </button>
        </div>
        {imageUploadUrl && (
          <IKImage className={styles.uploadedImage} src={imageUploadUrl} />
        )}
      </IKContext>
    </div>
  );
};
export default CreatePost;
