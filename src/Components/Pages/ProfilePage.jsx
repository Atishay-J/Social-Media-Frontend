import { useSelector } from "react-redux";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import styles from "./profilePage.module.css";
import useSortByTime from "../../hooks/useSortByTime";
import PostCard from "../Cards/PostCard";

const ProfilePage = () => {
  const { userData } = useSelector((state) => state.userData);
  const { posts } = useSelector((state) => state.posts);

  const filterUserPosts = posts.filter(
    (post) => post.username === userData.username
  );
  const sortedFeed = useSortByTime(filterUserPosts);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.bannerContainer}></div>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={userData.avatar} alt="Avatar" />
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            <h3 className={styles.fullName}>
              {userData.firstname} {userData.lastname}
            </h3>
            <h4 className={styles.username}>@{userData.username}</h4>
          </div>
          <div className={styles.bio}>404 bio not found</div>
          <div className={styles.followerContainer}>
            <h3 className={styles.following}> 23 following</h3>
            <h3 className={styles.following}> 22 followers</h3>
          </div>
        </div>
      </div>
      <div className={styles.postsContainer}>
        {sortedFeed.map((postData) => (
          <PostCard
            key={postData._id}
            postUsername={postData.username}
            avatar={postData.avatar}
            tweet={postData.postContent}
            postTime={postData.createdAt}
            postId={postData._id}
            postLikes={postData.likes}
          />
        ))}
      </div>
      <BottomNav />
    </div>
  );
};
export default ProfilePage;
