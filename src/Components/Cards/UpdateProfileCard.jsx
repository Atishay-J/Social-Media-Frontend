import { useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./profileCard.module.css";
import { XCircleFill } from "react-bootstrap-icons";

const UpdateProfileCard = ({ setShowUpdateProfile, setUserProfileData }) => {
  const [userInput, setUserInput] = useState({
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

  const updateProfile = () => {
    if (
      (userInput.firstname &&
        userInput.lastname &&
        userInput.bio &&
        userInput.location) === ""
    ) {
      return toast("Fields Can't be empty");
    }

    authAxios
      .post("/updateprofile", {
        firstname: userInput.firstname,
        lastname: userInput.lastname,
        bio: userInput.bio,
        location: userInput.location,
      })
      .then((res) => {
        console.log("Response Update profile", res);
        toast("Profile Updated");
      })
      .catch((err) => {
        console.log("Error While Updating Profile", err);
        toast("Some Error Occured, Reload the Page");
      });

    setUserProfileData((prevData) => {
      return {
        ...prevData,
        firstname: userInput.firstname,
        lastname: userInput.lastname,
        bio: userInput.bio,
        location: userInput.location,
      };
    });
    setShowUpdateProfile(false);
  };

  return (
    <div className={styles.updateProfileContainer}>
      {/* <ToastContainer /> */}
      <h3>Edit Profile</h3>

      <div onClick={() => setShowUpdateProfile(false)}>
        <XCircleFill />
      </div>

      <div className="inputPlaceholderWrapper">
        <p>Firstname</p>
        <input
          type="text"
          value={userInput.firstname}
          name="firstname"
          onChange={(event) => updateInput(event)}
          placeholder="First name"
        />
      </div>

      <div className="inputPlaceholderWrapper">
        <p>Lastname</p>
        <input
          type="text"
          value={userInput.lastname}
          name="lastname"
          onChange={(event) => updateInput(event)}
          placeholder="Last name"
        />
      </div>

      <div className="inputPlaceholderWrapper">
        <p>Bio</p>
        <textarea
          placeholder="Bio"
          name="bio"
          maxLength="80"
          value={userInput.bio}
          onChange={(event) => updateInput(event)}
        />
        <p> {userInput.bio.length} / 80</p>
      </div>

      <div className="inputPlaceholderWrapper">
        <p>Location</p>
        <input
          type="text"
          value={userInput.location}
          name="location"
          onChange={(event) => updateInput(event)}
          placeholder="First name"
        />
      </div>

      <button onClick={updateProfile}>Update</button>
    </div>
  );
};
export default UpdateProfileCard;
