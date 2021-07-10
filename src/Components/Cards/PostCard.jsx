import "./postCard.css";
import { Heart, Chat, ArrowDownUp, HeartFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useDispatch } from "react-redux";
import { likePost } from "../../features/post/postSlice";

const PostCard = ({ username, tweet, postTime, postId, postLikes, avatar }) => {
  const timeAgo = useTimeAgo(postTime);

  console.log("FEEEDDD Daaataaa Likes", postLikes);
  let numberOfLikes = postLikes.length;

  const dispatch = useDispatch();

  const handleLike = () => {
    console.log("clicked =====", postId);

    dispatch(likePost({ postId, username }));
  };

  return (
    <div className="postCardContainer">
      <div className="postUserInfoContainer">
        <img src={avatar} alt="User Avatar" className="postUserAvatar" />
        <div className="postUserInfo">
          <h1 className="postUserName">{username}</h1>
          <span className="postTime">{timeAgo} ago</span>
        </div>
      </div>
      <div className="postBodyContainer">{tweet}</div>
      <div className="postInteractionsContainer">
        <div className="postInteraction" onClick={handleLike}>
          {numberOfLikes > 0 ? (
            <>
              <HeartFill className="postInteractionOption likedButton" />
              <p className="postInteractionNumbers">{numberOfLikes}</p>
            </>
          ) : (
            <Heart className="postInteractionOption" />
          )}
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
