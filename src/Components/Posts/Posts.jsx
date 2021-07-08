import { useSelector } from "react-redux";
import PostCard from "../Cards/PostCard";

const Posts = () => {
  const postData = useSelector((state) => state.posts);
  return (
    <div className="postsContainer">
      {postData.posts.map((postData) => (
        <PostCard userName={postData.userName} />
      ))}
    </div>
  );
};

export default Posts;
