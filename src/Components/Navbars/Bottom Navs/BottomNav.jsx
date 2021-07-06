import "./bottomNav.css";

import { House, Search, Bell, Person } from "react-bootstrap-icons";

const BottomNav = () => {
  return (
    <div className="bottomNavContainer">
      <House className="bottomNavContainerItems" />
      <Search className="bottomNavContainerItems" />
      <Bell className="bottomNavContainerItems" />
      <Person className="bottomNavContainerItems" />
    </div>
  );
};
export default BottomNav;
