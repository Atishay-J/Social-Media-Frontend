import TopNav from "../Navbars/Top Navs/TopNav";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import Posts from "../Posts/Posts";
import CreateTweet from "../Tweet/CreateTweet";
const Homepage = () => {
  return (
    <div className="homepage">
      <TopNav />
      <CreateTweet />
      <Posts />
      <BottomNav />
    </div>
  );
};
export default Homepage;
