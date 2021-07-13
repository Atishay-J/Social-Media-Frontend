import "./topNav.css";

import { BoxArrowRight } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { signOut } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const TopNav = () => {
  const { loggedInUserData } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div className="topNavContainer">
      <div className="topNavUserProfile">
        <img
          className="topNavUserAvatar"
          src={loggedInUserData.avatar}
          alt="User Avatar"
        />
      </div>
      <h4>Logo</h4>
      <div onClick={logout}>
        <h3>Logout</h3>
        <BoxArrowRight className="topNavMenuBtn" />
      </div>
    </div>
  );
};
export default TopNav;
