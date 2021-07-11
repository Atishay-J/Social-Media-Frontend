import { useSelector } from "react-redux";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import styles from "./profilePage.module.css";
import useSortByTime from "../../hooks/useSortByTime";
import PostCard from "../Cards/PostCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import { useDispatch } from "react-redux";
import { fetchAllPosts } from "../../features/post/postSlice";
import { toggleFollow } from "../../features/User/userDataSlice";

const ProfilePage = () => {
  const { userData } = useSelector((state) => state.userData);
  const { posts } = useSelector((state) => state.posts);

  const [userProfileData, setUserProfileData] = useState("");

  const { username } = useParams();
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const response = await authAxios.post("/finduser", { username });
      setUserProfileData(response.data);
    } catch (err) {
      console.log("Error While Setting Userdata", err);
    }
  };

  const updateFollowOnServer = () => {
    authAxios
      .post("/togglefollow")
      .then((response) => console.log("REESSS FOOOLLOOW ", response))
      .catch((err) => console.log("RRREES ERRR FOLLOW ", err));
  };

  const addToFollow = () => {
    console.log("FOOLLOO", userData);
    dispatch(toggleFollow(userProfileData.username));
    setUserProfileData((prevState) => {
      return {
        ...prevState,
        followers: [...prevState.followers, userData.username],
      };
    });
    updateFollowOnServer();
  };

  useEffect(() => {
    console.log("===============\n===================\n====================");

    if (username === userData.username) {
      setUserProfileData(userData);
    }

    if (username !== userData.username) {
      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchAllPosts());
    }
  }, []);

  useEffect(() => {
    console.log("NEW Profile State Data ", userProfileData);
  }, [userProfileData]);

  const filterUserPosts = posts.filter((post) => post.username === username);
  const sortedFeed = useSortByTime(filterUserPosts);

  return (
    <div className={styles.container}>
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
            {username !== userData.username && (
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
