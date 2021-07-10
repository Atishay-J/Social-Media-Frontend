import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import Feed from "../Feed/Feed";
import CreatePost from "../Posts/CreatePost";

import { useEffect, useState } from "react";
import { fetchUserData } from "../../features/User/userDataSlice";
import { useSelector, useDispatch } from "react-redux";

const Homepage = () => {
  const { userData, status, error } = useSelector((state) => state.userData);
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("ISSSS UUUUSSSEERRR LLLOGGGINNN", isUserLoggedIn);
    if (isUserLoggedIn) {
      if (status === "idle") {
        dispatch(fetchUserData());
      }
    }
  }, [dispatch, isUserLoggedIn, status]);
  return (
    <div className="homepage">
      <TopNav />
      <CreatePost />
      <Feed />
      <BottomNav />
      {status === "error" && <h1>{error} </h1>}
    </div>
  );
};
export default Homepage;
