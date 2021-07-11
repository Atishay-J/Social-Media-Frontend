import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import Feed from "../Feed/Feed";
import CreatePost from "../Posts/CreatePost";

import { useEffect, useState } from "react";
import { fetchLoggedInUserData } from "../../features/User/userDataSlice";
import { useSelector, useDispatch } from "react-redux";

const Homepage = () => {
  const { loggedInUserData, loggedInUserStatus, error } = useSelector(
    (state) => state.userData
  );
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "ISSSS UUUUSSSEERRR LLLOGGGINNN",
      isUserLoggedIn,
      localStorage.getItem("userData")
    );
    if (isUserLoggedIn && localStorage.getItem("userData")) {
      if (loggedInUserStatus === "idle") {
        dispatch(fetchLoggedInUserData());
      }
    }
  }, [dispatch, isUserLoggedIn, loggedInUserStatus]);

  useEffect(() => {
    console.log("UUUUUSSSERRR Data  ====>>", loggedInUserData);
  }, [loggedInUserData]);

  useEffect(() => {
    console.log("LoggedIn User Status ", loggedInUserStatus);
  }, []);

  return (
    <div className="homepage">
      {loggedInUserStatus === "loading" && <h2>Loading...</h2>}
      {loggedInUserStatus === "fulfilled" && (
        <>
          <TopNav />
          <CreatePost />
          <Feed />
          <BottomNav />
        </>
      )}
      {loggedInUserStatus === "error" && <h1>{error} </h1>}
    </div>
  );
};
export default Homepage;
