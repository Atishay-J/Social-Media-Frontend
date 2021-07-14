import { Heart, Chat, ArrowDownUp, HeartFill } from "react-bootstrap-icons";
import { authAxios } from "../../Utils/authAxios";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useDispatch } from "react-redux";
import { togglePostLike } from "../../features/post/postSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./postCard.module.css";

import { IKImage, IKContext } from "imagekitio-react";

const PostCard = ({
  postUsername,
  postFirstname,
  postLastname,
  postAuthorId,
  post,
  postTime,
  postId,
  postLikes,
  postComments,
  avatar,
  postImg,
}) => {
  const { loggedInUserData } = useSelector((state) => state.userData);
  const [parsedPost, setParsedPost] = useState("");

  const [liked, setLiked] = useState(false);

  const timeAgo = useTimeAgo(postTime);

  let username = loggedInUserData.username;
  let userId = loggedInUserData._id;

  let numberOfLikes = postLikes.length;
  let numberOfComments = postComments.length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = async () => {
    dispatch(togglePostLike({ postId, postAuthorId, username, userId }));

    await authAxios
      .post(`/post/togglelike`, {
        username: loggedInUserData.username,
        postId,
        userId,
        postAuthorId,
      })
      .then((res) => console.log("Handle Axios Like ", res))
      .catch((err) => console.log("Handle axios like error", err));
  };

  useEffect(() => {
    let alreadyLiked = postLikes.find((user) => user === username);

    alreadyLiked ? setLiked(true) : setLiked(false);
  }, [postLikes, username]);

  const checkHashtags = () => {
    const rule = /([#|＃][^\s]+)/g;

    let parsedPost = post?.split(rule).map((e) => {
      if (e.match(rule)) {
        return <span style={{ color: "blue" }}>{e}</span>;
      }
      return e;
    });

    setParsedPost(parsedPost);
  };

  useEffect(() => {
    checkHashtags();
  }, [post]);

  return (
    <div className={styles.postCardContainer}>
      <div className={styles.postUserInfoContainer}>
        <img src={avatar} alt="User Avatar" className={styles.postUserAvatar} />
        <div className={styles.postUserInfo}>
          <Link to={`/profile/${postUsername}`}>
            <h1 className={styles.postFullName}>
              {postFirstname} {postLastname}
            </h1>
          </Link>

          <div className={styles.postTimeWrapper}>
            <h2 className={styles.postUsername}>{postUsername}</h2>

            <span className={styles.postTime}>{timeAgo} ago</span>
          </div>
        </div>
      </div>
      <div className={styles.postBodyContainer}>{parsedPost}</div>
      {postImg && (
        <div className={styles.postImageContainer}>
          <IKContext
            publicKey={process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY}
            urlEndpoint={process.env.REACT_APP_IMAGE_KIT_URL_ENDPOINT}
            transformationPosition="path"
            authenticationEndpoint="https://socialmetaphor.herokuapp.com/uploadimage"
          >
            <IKImage
              className={styles.imageKitImage}
              src={postImg}
              lqip={{ active: true, quality: 20, blur: 10 }}
            />
          </IKContext>
        </div>
      )}

      <div className={styles.postInteractionsContainer}>
        <div className={styles.postInteraction} onClick={handleLike}>
          {liked ? (
            <>
              <HeartFill
                className={`${styles.postInteractionOption} ${styles.likedButton}`}
              />
            </>
          ) : (
            <Heart className={styles.postInteractionOption} />
          )}
          <p className={styles.postInteractionNumbers}>{numberOfLikes}</p>
        </div>
        <div
          className={styles.postInteraction}
          onClick={() => navigate(`/posts/${postId}`)}
        >
          <Chat className={styles.postInteractionOption} />
          <p className={styles.postInteractionNumbers}>{numberOfComments}</p>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
