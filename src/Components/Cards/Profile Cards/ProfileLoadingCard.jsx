import styles from "./profileCard.module.css";
import Skeleton from "react-loading-skeleton";
const ProfileLoadingCard = () => {
  return (
    <div className={styles.profileContainer}>
      <div>
        <Skeleton height={100} circle={true} />
      </div>
      <div className={styles.avatarContainer}>
        <Skeleton circle={true} width={80} height={80} />
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.followBtnWrapper}>
          <div className={styles.userInfo}>
            <div>
              <Skeleton width={200} height={20} />
            </div>
            <div>
              <Skeleton width={100} height={20} />
            </div>
          </div>
          <Skeleton width={80} height={30} />
        </div>
        <div className={styles.bio}></div>
        <div className={styles.location}></div>
        <div className={styles.followerContainer}></div>
      </div>
    </div>
  );
};
export default ProfileLoadingCard;
