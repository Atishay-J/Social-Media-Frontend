import styles from "../Pages/Search Page/searchPage.module.css";
const SearchCard = ({ avatar, firstname, lastname, bio, username }) => {
  console.log("Search Card", { avatar, firstname, lastname, bio, username });

  return (
    <div className={styles.searchCard}>
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
