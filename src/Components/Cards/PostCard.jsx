import "./postCard.css";
import { Heart, Chat, ArrowDownUp } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import useTimeAgo from "../../hooks/useTimeAgo";

const PostCard = ({ username, tweet, postTime }) => {
  const [userData, setUserData] = useState("");

  const timeAgo = useTimeAgo(postTime);

  console.log("FEEEDDD Daaataaa", timeAgo);

  const getUserData = async () => {
    console.log("Get User DAta called", username);
    let apiURL = "http://localhost:8000/finduser";
    await axios
      .post(apiURL, { username })
      .then((res) => {
        console.log("REsssponse onf postCard ===>", res);
        setUserData(res.data);
      })
      .catch((err) => console.log("Error fetching user on feed", err));
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  return (
    <div className="postCardContainer">
      <div className="postUserInfoContainer">
        <img
          src={userData.avatar}
          alt="User Avatar"
          className="postUserAvatar"
        />
        <div className="postUserInfo">
          <h1 className="postUserName">{userData.username}</h1>
          <span className="postTime">{timeAgo} ago</span>
        </div>
      </div>
      <div className="postBodyContainer">{tweet}</div>
      <div className="postInteractionsContainer">
        <div className="postInteraction">
          <Heart className="postInteractionOption" />
          <p className="postInteractionNumbers">23</p>
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
