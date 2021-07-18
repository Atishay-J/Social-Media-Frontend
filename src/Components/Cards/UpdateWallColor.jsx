import { useState } from "react";
import styles from "./updateWallColor.module.css";
import { authAxios } from "../../Utils/authAxios";
import { XCircleFill } from "react-bootstrap-icons";
import { toastDark } from "../../Utils/toastMessage";
import { toast } from "react-toastify";
const UpdateWallColor = ({
  userProfileData,
  setUserProfileData,
  setShowUpdateProfile,
}) => {
  const [currentWallColor, setCurrentWallColor] = useState("");

  const colors = [
    { color: "#d80238", name: "Default" },
    { color: "#EFABFF", name: "Mauve" },
    { color: "#FFB86F", name: "Appricot" },
    { color: "#64F58D", name: "Spring green" },
    { color: "#BDADEA", name: "Blue Purple" },
    { color: "#F3DE8A", name: "Limish" },
    { color: "#FDCA40", name: "Sunglow" },
  ];

  const setNewColor = async (color) => {
    setCurrentWallColor(color);

    await authAxios
      .post("/updateprofile", { wallColor: color })
      .then((res) => console.log("Wall Updated"))
      .catch((err) => toastDark("some Error Occured,Reload the page"));

    setUserProfileData((prevState) => {
      return { ...prevState, wallColor: color };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h3 className={styles.heading}>Edit Profile</h3>

        <div
          className={styles.closeIconWrapper}
          onClick={() => setShowUpdateProfile(false)}
        >
          <XCircleFill />
        </div>
      </div>
      <div className={styles.profileContainer}>
        <div
          className={styles.wall}
          style={{ background: currentWallColor }}
        ></div>
        <div className={styles.userInfoWrapper}>
          <div className={styles.avatar}>
            <img src={userProfileData.avatar} alt="Avatar" />
          </div>
          <div className={styles.followBtn}>Follow</div>
        </div>
      </div>

      <div className={styles.colorPicker}>
        {colors.map(({ color, name }, index) => (
          <div
            key={index}
            className={styles.color}
            style={{ background: color }}
            onClick={() => setNewColor(color)}
          >
            <div className={styles.colorTip}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UpdateWallColor;
