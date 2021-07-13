const CommentCard = ({ avatar, firstname, lastname, username, comment }) => {
  return (
    <div className="commentCard">
      <div>
        <img src={avatar} alt="avatar" />
      </div>
      <div>
        <h3>
          {firstname} {lastname}
        </h3>
        <h4>{username}</h4>
        <div>{comment}</div>
      </div>
    </div>
  );
};
export default CommentCard;
