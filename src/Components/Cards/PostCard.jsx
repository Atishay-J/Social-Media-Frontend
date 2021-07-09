import "./postCard.css";
import { Heart, Chat, ArrowDownUp } from "react-bootstrap-icons";

const PostCard = ({ userName, tweet }) => {
  return (
    <div className="postCardContainer">
      <div className="postUserInfoContainer">
        <img
          src="https://avatars.dicebear.com/api/micah/alex.svg"
          alt="User Avatar"
          className="postUserAvatar"
        />
        <div className="postUserInfo">
          <h1 className="postUserName">{userName}</h1>
          <span className="postTime">6 hours ago</span>
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
