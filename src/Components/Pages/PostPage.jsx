import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { authAxios } from "../../Utils/authAxios";
import PostCard from "../Cards/PostCard";
import CommentCard from "../Cards/CommentCard";
import useSortByTime from "../../hooks/useSortByTime";
import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import styles from "./postPage.module.css";

const PostPage = () => {
  const [commentInput, setCommentInput] = useState("");
  const [postData, setPostData] = useState({ status: "idle", data: "" });
  const { loggedInUserData } = useSelector((state) => state.userData);
  const [uploadComment, setUploadComment] = useState({
    status: "idle",
    data: "",
  });

  const { postId } = useParams();

  const sortedByTime = useSortByTime();

  console.log("USErdata ", loggedInUserData);

  const fetchPost = async () => {
    setPostData({ status: "loading", data: "" });
    await authAxios
      .post(`/findpost/${postId}`)
      .then((res) => {
        console.log("response value =====>>>>>", res);
        setPostData({ status: "fulfilled", data: res.data });
      })
      .catch((err) => {
        console.log("error while fetching post", err);
        setPostData({ status: "error", data: "" });
      });
  };

  const addComment = async () => {
    setCommentInput("");
    setUploadComment({ status: "loading" });
    await authAxios
      .post("/post/addcomment", {
        postId,
        userId: loggedInUserData._id,
        avatar: loggedInUserData.avatar,
        firstname: loggedInUserData.firstname,
        lastname: loggedInUserData.lastname,
        username: loggedInUserData.username,
        comment: commentInput,
      })
      .then((res) => {
        console.log("Response ", res);
        setUploadComment({ status: "fulfilled", data: res.data });
        fetchPost();
      })
      .catch((err) => {
        console.log("error ", err);
        setUploadComment({ status: "error" });
      });
  };

  useEffect(() => {
    if (postData.status === "idle") {
      fetchPost();
    }
  }, [postData.status, postId]);

  return (
    <>
      <TopNav />
      {postData.status === "loading" && (
        <h1 className="loadingStatus">Loading...</h1>
      )}
      {postData.status === "fulfilled" && (
        <div className={styles.container}>
          <PostCard
            postUsername={postData.data.username}
            postFirstname={postData.data.firstname}
            postLastname={postData.data.lastname}
            postAuthorId={postData.data.userId}
            avatar={postData.data.avatar}
            post={postData.data.postContent}
            postTime={postData.data.createdAt}
            postId={postData.data._id}
            postLikes={postData.data.likes}
            postComments={postData.data.comments}
            postImg={postData.data.postImg}
          />

          <div className={styles.commentWrapper}>
            <textarea
              className={styles.commentArea}
              value={commentInput}
              placeholder="write a comment"
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button className={styles.commentBtn} onClick={addComment}>
              Comment
            </button>
          </div>

          <div className={styles.allComments}>
            <h3 className={styles.commentsHeading}>Comments</h3>
            {uploadComment.status === "loading" && (
              <h4 className="loadingStatus">Uploading...</h4>
            )}
            {postData.data.comments.length ? (
              postData.data.comments.map((comment) => (
                <CommentCard
                  avatar={comment.avatar}
                  firstname={comment.firstname}
                  lastname={comment.lastname}
                  username={comment.username}
                  comment={comment.comment}
                  createdAt={comment.createdAt}
                />
              ))
            ) : (
              <h1 className={styles.message}>No comments yet</h1>
            )}
          </div>
        </div>
      )}
      <BottomNav />
    </>
  );
};
export default PostPage;
