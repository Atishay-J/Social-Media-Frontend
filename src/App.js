import "./App.css";
import TopNav from "./Components/Navbars/Top Navs/TopNav";
import BottomNav from "./Components/Navbars/Bottom Navs/BottomNav";
import PostCard from "./Components/Cards/PostCard";
import CreateTweet from "./Components/Tweet/CreateTweet";
function App() {
  return (
    <div className="App">
      <TopNav />
      <CreateTweet />
      <PostCard />
      <BottomNav />
    </div>
  );
}

export default App;
