import "./bottomNav.css";

import { House, Search, Bell, Person } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="bottomNavContainer">
      <NavLink to="/home">
        <House className="bottomNavContainerItems" />
      </NavLink>
      <NavLink to="/search">
        <Search className="bottomNavContainerItems" />{" "}
      </NavLink>
      <NavLink to="/notifications">
        <Bell className="bottomNavContainerItems" />{" "}
      </NavLink>

      <NavLink to="/profile">
        <Person className="bottomNavContainerItems" />{" "}
      </NavLink>
    </div>
  );
};
export default BottomNav;
