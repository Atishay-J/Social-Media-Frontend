import "./topNav.css";

import { List } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const TopNav = () => {
  const { loggedInUserData } = useSelector((state) => state.userData);

  return (
    <div className="topNavContainer">
      <List className="topNavMenuBtn" />
      <h4>Logo</h4>
      <div className="topNavUserProfile">
        <img
          className="topNavUserAvatar"
          src={loggedInUserData.avatar}
          alt="User Avatar"
        />
      </div>
    </div>
  );
};
export default TopNav;
