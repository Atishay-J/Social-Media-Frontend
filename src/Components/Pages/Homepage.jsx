import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import Feed from "../Feed/Feed";
import CreatePost from "../Posts/CreatePost";

import { useEffect, useState } from "react";
import { fetchLoggedInUserData } from "../../features/User/userDataSlice";
import { useSelector, useDispatch } from "react-redux";

const Homepage = () => {
  const { userData, status, error } = useSelector((state) => state.userData);
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "ISSSS UUUUSSSEERRR LLLOGGGINNN",
      isUserLoggedIn,
      localStorage.getItem("userData")
    );
    if (isUserLoggedIn && localStorage.getItem("userData")) {
      if (status === "idle") {
        dispatch(fetchLoggedInUserData());
      }
    }
  }, [dispatch, isUserLoggedIn, status]);

  useEffect(() => {
    console.log("UUUUUSSSERRR Data  ====>>", userData);
  }, [userData]);

  return (
    <div className="homepage">
      {status === "loading" && <h2>Loading...</h2>}
      {status === "fulfilled" && (
        <>
          <TopNav />
          <CreatePost />
          <Feed />
          <BottomNav />
        </>
      )}
      {status === "error" && <h1>{error} </h1>}
    </div>
  );
};
export default Homepage;
