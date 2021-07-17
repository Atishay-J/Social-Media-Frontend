import styles from "./topNav.module.css";

import { BoxArrowRight } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { signOut } from "../../../features/auth/authSlice";
import { resetLoggedInUserData } from "../../../features/User/userDataSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { loggedInUserData } = useSelector((state) => state.userData);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(signOut());
    dispatch(resetLoggedInUserData());
  };

  return (
    <div className={styles.topNavContainer}>
      <h2 className={styles.logo} onClick={() => navigate("/home")}>
        Social Meta<span className={styles.logoBackdrop}>phor</span>
      </h2>
      <div
        className={styles.userProfile}
        onClick={() => setShowLogoutBtn((prev) => !prev)}
      >
        <img
          className={styles.avatar}
          src={loggedInUserData.avatar}
          alt="User Avatar"
        />
        <div
          className={styles.logoutWrapper}
          style={{ display: showLogoutBtn ? "flex" : "none" }}
          onClick={logout}
        >
          <h3 className={styles.logoutText}>
            Logout <BoxArrowRight className={styles.logoutIcon} />
          </h3>
        </div>
      </div>
    </div>
  );
};
export default TopNav;
