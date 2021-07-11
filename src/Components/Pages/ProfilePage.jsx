import { useSelector, useDispatch } from "react-redux";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
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
  // const { loggedInUserdata, status } = useSelector((state) => state.userData);
  const {
    loggedInUserData,
    userData,
    loggedInUserStatus,
    userDataStatus,
    error,
  } = useSelector((state) => state.userData);
  const { posts } = useSelector((state) => state.posts);

  const [userProfileData, setUserProfileData] = useState("");
  const [showFollowBtn, setShowFollowBtn] = useState(false);

  const { username } = useParams();
  const dispatch = useDispatch();

  const updateFollowOnServer = () => {
    authAxios
      .post("/togglefollow")
      .then((response) => console.log("REESSS FOOOLLOOW ", response))
      .catch((err) => console.log("RRREES ERRR FOLLOW ", err));
  };

  useEffect(() => {
    console.log("===============\n===================\n====================");

    if (username === loggedInUserData.username) {
      setUserProfileData(loggedInUserData);
    }

    if (username !== loggedInUserData.username) {
      console.log("Orderd To Fetch User Data");
      setShowFollowBtn(true);

      if (userDataStatus === "idle") {
        console.log("DIspatching becuse Idle");
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

  useEffect(() => {
    console.log("NEW Profile State Data ", userProfileData);
  }, [userProfileData]);

  useEffect(() => {
    console.log(
      "Satatastast ",
      loggedInUserData,
      "\n userDATaStatus ",
      userDataStatus,
      "\n loggedInStauts",
      loggedInUserStatus,
      "userdata ",
      userData
    );
  }, [loggedInUserData, loggedInUserStatus, userData, userDataStatus]);

  const filterUserPosts = posts.filter((post) => post.username === username);
  const sortedFeed = useSortByTime(filterUserPosts);

  return (
    <div>
      {userProfileData.username ? (
        <>
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
