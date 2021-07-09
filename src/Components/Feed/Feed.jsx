import { useSelector } from "react-redux";
import PostCard from "../Cards/PostCard";

const Feed = () => {
  const feedData = useSelector((state) => state.posts);

  console.log("Feed data from feed", feedData);

  return (
    <div className="postsContainer">
      {feedData.posts.map((feedData) => (
        <PostCard username={feedData.username} tweet={feedData.postContent} />
      ))}
    </div>
  );
};

export default Feed;
