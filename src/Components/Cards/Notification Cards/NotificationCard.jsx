import useTimeAgo from "../../../hooks/useTimeAgo";
import styles from "./notificationCard.module.css";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ sourceUser, createdAt, notificationType }) => {
  const timeAgo = useTimeAgo(createdAt);
  const navigate = useNavigate();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/profile/${sourceUser.username}`)}
    >
      <div className={styles.avatarWrapper}>
        <img className={styles.avatar} src={sourceUser.avatar} alt="Avatar" />
      </div>
      <div className={styles.userInfo}>
        <div>
          <h4 className={styles.firstname}>
            {sourceUser.firstname} {sourceUser.lastname}
          </h4>
          <h5 className={styles.username}>{sourceUser.username}</h5>
        </div>
        <div className={styles.notificationType}>
          {notificationType === "NEWFOLLOWER" && <h5>Started following you</h5>}
          {notificationType === "LIKE" && <h5>Liked your post</h5>}
          {notificationType === "COMMENT" && <h5>Commented on your post</h5>}
          <p className={styles.timeAgo}>{timeAgo} ago</p>
        </div>
      </div>
    </div>
  );
};
export default NotificationCard;
