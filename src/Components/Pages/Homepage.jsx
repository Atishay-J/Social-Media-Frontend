import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import Feed from "../Feed/Feed";
import CreatePost from "../Posts/CreatePost";

import { useSelector } from "react-redux";

const Homepage = () => {
  const { loggedInUserStatus, error } = useSelector((state) => state.userData);

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
