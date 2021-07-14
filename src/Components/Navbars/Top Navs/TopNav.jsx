import styles from "./topNav.module.css";

import { BoxArrowRight } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { signOut } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TopNav = () => {
  const { loggedInUserData } = useSelector((state) => state.userData);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div className={styles.topNavContainer}>
      <h2 className={styles.logo}>
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
          <h3 className={styles.logoutText}>Logout</h3>
          <BoxArrowRight className={styles.logoutIcon} />
        </div>
      </div>
    </div>
  );
};
export default TopNav;
