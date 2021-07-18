import { useSelector, useDispatch } from "react-redux";
import BottomNav from "../../Navbars/Bottom Navs/BottomNav";
import TopNav from "../../Navbars/Top Navs/TopNav";
// import styles from "./profilePage.module.css";
import useSortByTime from "../../../hooks/useSortByTime";
import PostCard from "../../Cards/PostCard";
import ProfileCard from "../../Cards/ProfileCard";
// import UpdateProfileCard from "../../Cards/UpdateProfileCard";
import UpdateProfileOptions from "./UpdateProfileOptions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchAllPosts } from "../../../features/post/postSlice";
import {
  toggleFollow,
  fetchUserData,
  resetUserData,
} from "../../../features/User/userDataSlice";
import styles from "./profilePage.module.css";

const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState("");
  const [showFollowBtn, setShowFollowBtn] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const {
    loggedInUserData,
    userData,
    loggedInUserStatus,
    userDataStatus,
    error,
  } = useSelector((state) => state.userData);
  const { posts, postStatus } = useSelector((state) => state.posts);

  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username === loggedInUserData.username) {
      setUserProfileData(loggedInUserData);
      setShowFollowBtn(false);
    }

    if (username !== loggedInUserData.username) {
      setShowFollowBtn(true);

      if (userDataStatus === "idle") {
        dispatch(fetchUserData(username));
      }
      setUserProfileData(userData);
    }
  }, [dispatch, userData, userDataStatus, username]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchAllPosts());
    }
  }, []);

  useEffect(() => {
    dispatch(resetUserData());
  }, [dispatch, username]);

  const filterUserPosts = posts.filter((post) => post.username === username);
  const sortedFeed = useSortByTime(filterUserPosts);

  return (
    <div>
      <ToastContainer />
      {showUpdateProfile ? (
        <UpdateProfileOptions
          userProfileData={userProfileData}
          setShowUpdateProfile={setShowUpdateProfile}
          setUserProfileData={setUserProfileData}
        />
      ) : (
        <div className={styles.container}>
          {userProfileData.username ? (
            <>
              <TopNav />
              <div className={styles.profilePage}>
                <ProfileCard
                  userProfileData={userProfileData}
                  setUserProfileData={setUserProfileData}
                  loggedInUserData={loggedInUserData}
                  showFollowBtn={showFollowBtn}
                  setShowUpdateProfile={setShowUpdateProfile}
                />
                <div>
                  {postStatus === "loading" && <h3>Loading...</h3>}

                  {postStatus === "fulfilled" &&
                    sortedFeed.map((postData) => (
                      <PostCard
                        key={`${postData._id}profile`}
                        postUsername={postData.username}
                        postFirstname={postData.firstname}
                        postLastname={postData.lastname}
                        avatar={postData.avatar}
                        post={postData.postContent}
                        postImg={postData.postImg}
                        postTime={postData.createdAt}
                        postId={postData._id}
                        postLikes={postData.likes}
                        postComments={postData.comments}
                      />
                    ))}
                </div>
              </div>
              <BottomNav />
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
