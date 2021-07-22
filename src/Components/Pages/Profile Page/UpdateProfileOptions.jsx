import { UpdateProfileCard, UpdateWallColor } from "../../Cards";

import styles from "./profilePage.module.css";
const UpdateProfileOptions = ({
  setShowUpdateProfile,
  setUserProfileData,
  userProfileData,
}) => {
  return (
    <div className={styles.updateProfileOptions}>
      <UpdateWallColor
        userProfileData={userProfileData}
        setUserProfileData={setUserProfileData}
        setShowUpdateProfile={setShowUpdateProfile}
      />
      <UpdateProfileCard
        setShowUpdateProfile={setShowUpdateProfile}
        setUserProfileData={setUserProfileData}
      />
    </div>
  );
};
export default UpdateProfileOptions;
