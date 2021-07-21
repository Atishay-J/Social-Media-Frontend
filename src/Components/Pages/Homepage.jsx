import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import HomepageLoadingCard from "../Cards/HomepageLoadingCard";
import Feed from "../Feed/Feed";
import CreatePost from "../Posts/CreatePost";
import styles from "./hompage.module.css";

import { useSelector } from "react-redux";

const Homepage = () => {
  const { loggedInUserStatus, error } = useSelector((state) => state.userData);

  return (
    <>
      <TopNav />
      <div className={styles.homepage}>
        {loggedInUserStatus === "loading" && <HomepageLoadingCard />}
        {loggedInUserStatus === "fulfilled" && (
          <>
            <CreatePost />
            <Feed />
          </>
        )}
        {loggedInUserStatus === "error" && <h1>{error} </h1>}
      </div>
      <BottomNav />
    </>
  );
};
export default Homepage;
