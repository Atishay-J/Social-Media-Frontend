import { useNavigate } from "react-router-dom";
const SearchCard = ({ avatar, firstname, lastname, bio, username, styles }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.searchCard}
      onClick={() => navigate(`/profile/${username}`)}
    >
      <div className={styles.searchCardAvatarWrapper}>
        <img className={styles.searchCardAvatar} src={avatar} alt="avatar" />
      </div>
      <div className={styles.searchCardUserInfo}>
        <h3 className={styles.searchCardFullname}>
          {firstname} {lastname}
        </h3>
        <h4 className={styles.searchCardUsername}>{username}</h4>
        <div className={styles.searchCardBio}>{bio}</div>
      </div>
    </div>
  );
};
export default SearchCard;
