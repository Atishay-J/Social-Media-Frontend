import styles from "./profileCard.module.css";
const ProfileCard = ({ userProfileData, showFollowBtn }) => {
  const addToFollow = () => {
    console.log("FOOOLLLOOWW");
    // console.log("FOOLLOO", loggedInUserData);
    // dispatch(toggleFollow(userProfileData.username));
    // setUserProfileData((prevState) => {
    //   return {
    //     ...prevState,
    //     followers: [...prevState.followers, loggedInUserData.username],
    //   };
    // });
    // updateFollowOnServer();
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}></div>
      <div className={styles.avatarContainer}>
        <img
          className={styles.avatar}
          src={userProfileData.avatar}
          alt="Avatar"
        />
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.followBtnWrapper}>
          <div className={styles.userInfo}>
            <h3 className={styles.fullName}>
              {userProfileData.firstname} {userProfileData.lastname}
            </h3>
            <h4 className={styles.username}>@{userProfileData.username}</h4>
          </div>
          {showFollowBtn && (
            <button className={styles.followBtn} onClick={addToFollow}>
              Follow
            </button>
          )}
        </div>
        <div className={styles.bio}>404 bio not found</div>
        <div className={styles.followerContainer}>
          <h3 className={styles.following}>
            {" "}
            {userProfileData.following?.length} following
          </h3>
          <h3 className={styles.following}>
            {" "}
            {userProfileData.followers?.length} followers
          </h3>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
