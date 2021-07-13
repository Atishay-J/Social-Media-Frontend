import styles from "./profileCard.module.css";
import { authAxios } from "../../Utils/authAxios";
import { useSelector, useDispatch } from "react-redux";
import { toggleFollow } from "../../features/User/userDataSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { GeoAlt } from "react-bootstrap-icons";

const ProfileCard = ({
  userProfileData,
  showFollowBtn,
  loggedInUserData,
  setUserProfileData,
  setShowUpdateProfile,
}) => {
  const dispatch = useDispatch();

  const updateFollowOnServer = () => {
    console.log(
      "Follow On Server chjjeck \n",
      loggedInUserData,
      "\n userDATA \n",
      userProfileData
    );

    authAxios
      .post("/togglefollow", {
        username: loggedInUserData.username,
        userId: loggedInUserData._id,
        followingTo: userProfileData.username,
        followingToId: userProfileData._id,
      })
      .then((response) => console.log("REESSS FOOOLLOOW ", response))
      .catch((err) => {
        console.log("RRREES ERRR FOLLOW ", err);
        dispatch(toggleFollow(userProfileData.username));
        toggleUserProfileFollower();
        toast("Some Error Occured, Refresh the page");
      });
  };

  const toggleUserProfileFollower = () => {
    const checkIfAlreadyFollower = userProfileData.followers.find(
      (follower) => follower === loggedInUserData.username
    );

    if (checkIfAlreadyFollower) {
      const removeFollowing = userProfileData.followers.filter(
        (follower) => follower !== loggedInUserData.username
      );
      setUserProfileData((prevState) => {
        return {
          ...prevState,
          followers: removeFollowing,
        };
      });
    } else {
      setUserProfileData((prevState) => {
        return {
          ...prevState,
          followers: [...prevState.followers, loggedInUserData.username],
        };
      });
    }
  };

  const addToFollow = () => {
    dispatch(toggleFollow(userProfileData.username));
    toggleUserProfileFollower();
    updateFollowOnServer();
  };

  useEffect(() => {
    console.log("Uesr profgile data chnanged", userProfileData);
  }, [userProfileData]);

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
          {showFollowBtn ? (
            <button className={styles.followBtn} onClick={addToFollow}>
              {userProfileData.followers.find(
                (follower) => follower === loggedInUserData.username
              )
                ? "Following"
                : "Follow"}
            </button>
          ) : (
            <button
              className={styles.followBtn}
              onClick={() => setShowUpdateProfile(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className={styles.bio}>
          {userProfileData.bio || "My Bio is a Mystery"}
        </div>
        <div className={styles.location}>
          <GeoAlt /> {userProfileData.location}
        </div>
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
