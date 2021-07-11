import { useSelector, useDispatch } from "react-redux";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import TopNav from "../Navbars/Top Navs/TopNav";
// import styles from "./profilePage.module.css";
import useSortByTime from "../../hooks/useSortByTime";
import PostCard from "../Cards/PostCard";
import ProfileCard from "../Cards/ProfileCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import { fetchAllPosts } from "../../features/post/postSlice";
import {
  toggleFollow,
  fetchUserData,
  resetUserData,
} from "../../features/User/userDataSlice";

const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState("");
  const [showFollowBtn, setShowFollowBtn] = useState(false);

  const {
    loggedInUserData,
    userData,
    loggedInUserStatus,
    userDataStatus,
    error,
  } = useSelector((state) => state.userData);
  const { posts } = useSelector((state) => state.posts);

  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username === loggedInUserData.username) {
      setUserProfileData(loggedInUserData);
    }

    if (username !== loggedInUserData.username) {
      setShowFollowBtn(true);

      if (userDataStatus === "idle") {
        dispatch(fetchUserData(username));
      }
      setUserProfileData(userData);
    }
  }, [dispatch, loggedInUserData, userData, userDataStatus, username]);

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
      {userProfileData.username ? (
        <>
          <TopNav />
          <ProfileCard
            userProfileData={userProfileData}
            showFollowBtn={showFollowBtn}
          />
          <div>
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
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
export default ProfilePage;
