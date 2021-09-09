import { useState } from "react";
import { useSelector } from "react-redux";
import { toastDark } from "../../../Utils/toastMessage";
import { authAxios } from "../../../Utils/authAxios";

const UpdatePassword = ({ styles }) => {
  const { loggedInUserData } = useSelector((state) => state.userData);

  const [{ currentPassword, newPassword, confirmPassword }, setPassword] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const updatePassword = async () => {
    if (newPassword === confirmPassword) {
      return await authAxios
        .post("/updatePassword", {
          currentPassword,
          newPassword,
          username: loggedInUserData.username,
        })
        .then((res) => toastDark("Password Updated"))
        .catch((err) => toastDark("some error occured, reload the page"));
    }
    toastDark("Password do not match");
  };
  const updateInput = (event) => {
    let { value, name } = event.target;

    setPassword((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.changePasswordWrapper}>
      <h3 className={styles.heading}>Change Password</h3>
      <div className={styles.inputPlaceholderWrapper}>
        <input
          className={styles.inputs}
          type={showPassword ? "text" : "password"}
          value={currentPassword}
          name="currentPassword"
          onChange={(event) => updateInput(event)}
          placeholder="Current Password"
        />
      </div>
      <div className={styles.inputPlaceholderWrapper}>
        <input
          className={styles.inputs}
          type={showPassword ? "text" : "password"}
          value={newPassword}
          name="newPassword"
          onChange={(event) => updateInput(event)}
          placeholder="New Password"
        />
      </div>
      <div className={styles.inputPlaceholderWrapper}>
        <input
          className={styles.inputs}
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          name="confirmPassword"
          onChange={(event) => updateInput(event)}
          placeholder="Confirm Password"
        />
      </div>
      <button className={styles.updateProfileBtn} onClick={updatePassword}>
        Change Password
      </button>
    </div>
  );
};
export default UpdatePassword;
