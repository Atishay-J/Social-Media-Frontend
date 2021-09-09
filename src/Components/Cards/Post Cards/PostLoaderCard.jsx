import Skeleton from "react-loading-skeleton";
import styles from "./postCard.module.css";
const PostLoaderCard = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {Array(10)
        .fill()
        .map((item, index) => (
          <div className={styles.postCardContainer} key={index}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Skeleton width={50} height={50} circle={true} />
              <div style={{ marginLeft: "1rem" }}>
                <Skeleton count={2} width={30} />
              </div>
            </div>
            <Skeleton className={styles.postBodyContainer} height={50} />
          </div>
        ))}
    </div>
  );
};
export default PostLoaderCard;
