import styles from "./bottomNav.module.css";

import { House, Search, Bell, Person } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNav = () => {
  const { loggedInUserData } = useSelector((state) => state.userData);
  return (
    <div className={styles.bottomNavContainer}>
      <NavLink to="/home">
        <House className={styles.bottomNavContainerItems} />
      </NavLink>
      <NavLink to="/search">
        <Search className={styles.bottomNavContainerItems} />{" "}
      </NavLink>
      <NavLink to="/notifications">
        <Bell className={styles.bottomNavContainerItems} />{" "}
      </NavLink>

      <NavLink to={`/profile/${loggedInUserData.username}`}>
        <Person className={styles.bottomNavContainerItems} />{" "}
      </NavLink>
    </div>
  );
};
export default BottomNav;
