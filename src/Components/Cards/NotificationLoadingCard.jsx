import styles from "./notificationLoadingCard.module.css";
import Skeleton from "react-loading-skeleton";
const NotificatinLoadingCard = () => {
  return (
    <>
      {Array(3)
        .fill()
        .map((item, index) => {
          return (
            <div key={index} className={styles.notificationLoadingContainer}>
              <div className={styles.avatarWrapper}>
                <Skeleton circle={true} width={50} height={50} />
              </div>
              <div className={styles.userInfo}>
                <Skeleton width={60} height={10} />
                <Skeleton width={40} height={10} />
              </div>
            </div>
          );
        })}
    </>
  );
};
export default NotificatinLoadingCard;
