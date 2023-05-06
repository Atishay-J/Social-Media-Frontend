import { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import PostEditor from "./Post Editor/PostEditor";

import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../features/post/postSlice";
import { IKImage, IKContext, IKUpload } from "imagekitio-react";
import { Upload } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import styles from "./createPost.module.css";

const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [showImageLoader, setImageLoader] = useState(false);

  const { loggedInUserData } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const createPost = () => {
    let postContent = editorState.getCurrentContent().getPlainText();
    let {
      username,
      firstname,
      lastname,
      avatar,
      _id: userId,
    } = loggedInUserData;

    if (postContent || imageUploadUrl) {
      dispatch(
        uploadPost({
          postContent,
          username,
          firstname,
          lastname,
          userId,
          avatar,
          postImg: imageUploadUrl,
        })
      );

      const newEditorState = EditorState.push(
        editorState,
        ContentState.createFromText("")
      );
      setEditorState(newEditorState);
      setImageUploadUrl("");
      setShowUploadBtn(false);
    } else {
      toast("Post Cannot Be empty");
    }
  };

  const onError = (err) => {
    console.log("IMAGE UPLOAD Error");
    console.log(err);
  };

  const onSuccess = (res) => {
    setImageUploadUrl(res.url);
    setImageLoader(false);
  };

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.createPostWrapper}>
        <img
          className={styles.userAvatar}
          src={loggedInUserData.avatar}
          alt="User Avatar"
        />
      </div>

      <div className={styles.postEditorWrapper}>
        <PostEditor editorState={editorState} setEditorState={setEditorState} />
        <IKContext
          publicKey={process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY}
          urlEndpoint={process.env.REACT_APP_IMAGE_KIT_URL_ENDPOINT}
          transformationPosition="path"
          authenticationEndpoint={`${process.env.REACT_APP_SERVER_URL}/uploadimage`}
        >
          <div className={styles.buttonsWrapper}>
            {showUploadBtn ? (
              <IKUpload
                className={styles.imageKitUpload}
                onChange={() => setImageLoader(true)}
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
          {showImageLoader ? (
            <Skeleton
              height={100}
              style={{ marginTop: "2rem", borderRadius: "20px" }}
            />
          ) : (
            <IKImage
              className={styles.uploadedImage}
              style={{ display: imageUploadUrl ? "block" : "none" }}
              src={imageUploadUrl}
            />
          )}
        </IKContext>
      </div>
    </div>
  );
};
export default CreatePost;
