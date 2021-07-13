import "./postCard.css";
import { Heart, Chat, ArrowDownUp, HeartFill } from "react-bootstrap-icons";
import { authAxios } from "../../Utils/authAxios";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useDispatch } from "react-redux";
import { togglePostLike } from "../../features/post/postSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IKImage, IKContext } from "imagekitio-react";

const PostCard = ({
  postUsername,
  postAuthorId,
  post,
  postTime,
  postId,
  postLikes,
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

  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(togglePostLike({ postId, postAuthorId, username, userId }));

    console.log("THING SENDING IN BODY\n \n \n ", {
      username: loggedInUserData.username,
      postId,
      userId,
    });

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
    <div className="postCardContainer">
      <div className="postUserInfoContainer">
        <img src={avatar} alt="User Avatar" className="postUserAvatar" />
        <div className="postUserInfo">
          <Link to={`/profile/${postUsername}`}>
            <h1 className="postUsername">{postUsername}</h1>
          </Link>
          <span className="postTime">{timeAgo} ago</span>
        </div>
      </div>
      <div className="postBodyContainer">{parsedPost}</div>
      {postImg && (
        <div className="postImageContainer">
          <IKContext
            publicKey={process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY}
            urlEndpoint={process.env.REACT_APP_IMAGE_KIT_URL_ENDPOINT}
            transformationPosition="path"
            authenticationEndpoint="http://localhost:8000/uploadimage"
          >
            <IKImage
              className="imageKitImage"
              src={postImg}
              lqip={{ active: true, quality: 20, blur: 10 }}
            />
          </IKContext>
        </div>
      )}

      <div className="postInteractionsContainer">
        <div className="postInteraction" onClick={handleLike}>
          {liked ? (
            <>
              <HeartFill className="postInteractionOption likedButton" />
            </>
          ) : (
            <Heart className="postInteractionOption" />
          )}
          <p className="postInteractionNumbers">{numberOfLikes}</p>
        </div>
        <div className="postInteraction">
          <Chat className="postInteractionOption" />
          <p className="postInteractionNumbers">23</p>
        </div>
        <div className="postInteraction">
          <ArrowDownUp className="postInteractionOption" />
          <p className="postInteractionNumbers">23</p>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
