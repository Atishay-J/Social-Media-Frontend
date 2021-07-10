import "./postCard.css";
import { Heart, Chat, ArrowDownUp, HeartFill } from "react-bootstrap-icons";
import { authAxios } from "../../Utils/authAxios";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useDispatch } from "react-redux";
import { togglePostLike } from "../../features/post/postSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({
  postUsername,
  tweet,
  postTime,
  postId,
  postLikes,
  avatar,
}) => {
  const { userData } = useSelector((state) => state.userData);

  const [liked, setLiked] = useState(false);

  const timeAgo = useTimeAgo(postTime);

  let username = userData.username;

  let numberOfLikes = postLikes.length;

  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(togglePostLike({ postId, username }));

    await authAxios
      .post(`/post/togglelike`, { username: userData.username, postId })
      .then((res) => console.log("Handle Axios Like ", res))
      .catch((err) => console.log("Handle axios like error", err));
  };

  useEffect(() => {
    let alreadyLiked = postLikes.find((user) => user === username);

    alreadyLiked ? setLiked(true) : setLiked(false);
  }, [postLikes, username]);

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
      <div className="postBodyContainer">{tweet}</div>
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
