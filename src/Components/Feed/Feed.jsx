import { useSelector } from "react-redux";
import PostCard from "../Cards/PostCard";

const Feed = () => {
  const feedData = useSelector((state) => state.posts);

  console.log("Post Dataa from POsts", feedData);

  return (
    <div className="postsContainer">
      {feedData.posts.map((feedData) => (
        <PostCard userName={feedData.userName} tweet={feedData.tweet} />
      ))}
    </div>
  );
};

export default Feed;
