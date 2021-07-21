import Skeleton from "react-loading-skeleton";
import styles from "./homepageLoadingCard.module.css";

const HomepageLoadingCard = () => {
  return (
    <div className={styles.homepageLoadingContainer}>
      <div className={styles.avatarWrapper}>
        <Skeleton circle={true} width={50} height={50} />
      </div>
      <div className={styles.button}>
        <Skeleton width={80} height={30} />
      </div>
    </div>
  );
};
export default HomepageLoadingCard;
