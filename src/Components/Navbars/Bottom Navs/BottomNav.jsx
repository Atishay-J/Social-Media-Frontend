import styles from "./bottomNav.module.css";

import { House, Search, Bell, Person } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNav = () => {
  const { loggedInUserData } = useSelector((state) => state.userData);
  return (
    <div className={styles.bottomNavContainer}>
      <NavLink className={styles.bottomNavContainerItems} to="/home">
        <House className={styles.bottomNavContainerIcons} />
        <p className={styles.navlinkName}>Home</p>
      </NavLink>

      <NavLink className={styles.bottomNavContainerItems} to="/search">
        <Search className={styles.bottomNavContainerIcons} />{" "}
        <p className={styles.navlinkName}>Search</p>
      </NavLink>

      <NavLink className={styles.bottomNavContainerItems} to="/notifications">
        <Bell className={styles.bottomNavContainerIcons} />{" "}
        <p className={styles.navlinkName}>Notifications</p>
      </NavLink>

      <NavLink
        className={styles.bottomNavContainerItems}
        to={`/profile/${loggedInUserData.username}`}
      >
        <Person className={styles.bottomNavContainerIcons} />{" "}
        <p className={styles.navlinkName}>Profile</p>
      </NavLink>
    </div>
  );
};
export default BottomNav;
