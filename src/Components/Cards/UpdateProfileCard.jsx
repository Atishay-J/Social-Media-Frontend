import { useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import styles from "./profileCard.module.css";
import { XCircleFill } from "react-bootstrap-icons";
import { toastDark, toastSuccess } from "../../Utils/toastMessage";
import UpdatePassword from "./UpdatePasswordCard";

const UpdateProfileCard = ({ setShowUpdateProfile, setUserProfileData }) => {
  const [{ firstname, lastname, bio, location }, setUserInput] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    location: "",
  });

  const updateInput = (event) => {
    let { value, name } = event.target;

    setUserInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const updateProfile = async () => {
    if (firstname !== "" && lastname !== "" && bio !== "" && location !== "") {
      await authAxios
        .post("/updateprofile", {
          firstname,
          lastname,
          bio,
          location,
        })
        .then((res) => {
          toastSuccess("Profile Updated");
        })
        .catch((err) => {
          console.log("Error While Updating Profile", err);
          toastDark("Some Error Occured, Reload the Page");
        });

      setUserProfileData((prevData) => {
        return {
          ...prevData,
          firstname,
          lastname,
          bio,
          location,
        };
      });
      setShowUpdateProfile(false);
    }
    toastDark("Fields Can't be empty");
  };

  return (
    <div className={styles.updateProfileContainer}>
      <div className={styles.headingWrapper}>
        <h3 className={styles.heading}>Edit Profile</h3>

        <div
          className={styles.closeIconWrapper}
          onClick={() => setShowUpdateProfile(false)}
        >
          <XCircleFill />
        </div>
      </div>

      <div className={styles.inputPlaceholderWrapper}>
        {/* <p className={styles.inputLabel}>Firstname</p> */}
        <input
          className={styles.inputs}
          type="text"
          value={firstname}
          name="firstname"
          onChange={(event) => updateInput(event)}
          placeholder="First name"
        />
      </div>

      <div className={styles.inputPlaceholderWrapper}>
        {/* <p className={styles.inputLabel}>Lastname</p> */}
        <input
          className={styles.inputs}
          type="text"
          value={lastname}
          name="lastname"
          onChange={(event) => updateInput(event)}
          placeholder="Last name"
        />
      </div>

      <div className={styles.inputPlaceholderWrapper}>
        {/* <p className={styles.inputLabel}>Bio</p> */}
        <textarea
          className={styles.textarea}
          placeholder="Bio"
          name="bio"
          maxLength="80"
          value={bio}
          onChange={(event) => updateInput(event)}
        />
        <p className={styles.bioCount}> {bio.length} / 80</p>
      </div>

      <div className={styles.inputPlaceholderWrapper}>
        {/* <p className={styles.inputLabel}>Location</p> */}
        <input
          className={styles.inputs}
          type="text"
          value={location}
          name="location"
          onChange={(event) => updateInput(event)}
          placeholder="Location"
        />
      </div>
      <button className={styles.updateProfileBtn} onClick={updateProfile}>
        Update
      </button>
      <UpdatePassword styles={styles} />
    </div>
  );
};
export default UpdateProfileCard;
