import "./postCard.css";
import { Heart, Chat, ArrowDownUp } from "react-bootstrap-icons";

const PostCard = ({ userName }) => {
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
      <div className="postBodyContainer">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
        consequatur reiciendis! A, quia fugiat eaque, ab vitae odio voluptatum
        impedit nostrum consequuntur magnam animi nulla maiores quaerat
        repudiandae delectus! Voluptatum.
      </div>
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
