import useTimeAgo from "../../hooks/useTimeAgo";

const NotificationCard = ({ sourceUser, createdAt, notificationType }) => {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <div>
      <div>
        <img src={sourceUser.avatar} alt="Avatar" />
      </div>
      <div>
        <h4>{sourceUser.fistname}</h4>
        <h5>{sourceUser.username}</h5>
      </div>
      <div>
        {notificationType === "NEWFOLLOWER" && <h5>Started following you</h5>}
        {notificationType === "LIKE" && <h5>Liked your post</h5>}
        {notificationType === "COMMENT" && <h5>Commented on your post</h5>}
        <p>{timeAgo} ago</p>
      </div>
    </div>
  );
};
export default NotificationCard;
