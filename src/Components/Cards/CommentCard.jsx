import styles from "./commentCard.module.css";

const CommentCard = ({
  avatar,
  firstname,
  lastname,
  username,
  comment,
  createdAt,
}) => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.infoWrapper}>
        <img className={styles.avatar} src={avatar} alt="avatar" />

        <div className={styles.userInfo}>
          <h3 className={styles.fullname}>
            {firstname} {lastname}
          </h3>
          <h4 className={styles.username}>{username}</h4>
          <h5>{createdAt}</h5>
        </div>
      </div>
      <div className={styles.comment}>{comment}</div>
    </div>
  );
};
export default CommentCard;
