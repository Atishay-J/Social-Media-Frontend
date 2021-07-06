import "./topNav.css";

import { List } from "react-bootstrap-icons";

const TopNav = () => {
  return (
    <div className="topNavContainer">
      <List className="topNavMenuBtn" />
      <h4>Logo</h4>
      <div className="topNavUserProfile">
        <img
          className="topNavUserAvatar"
          src="https://avatars.dicebear.com/api/micah/alex.svg"
          alt="User Profile"
        />
      </div>
    </div>
  );
};
export default TopNav;
