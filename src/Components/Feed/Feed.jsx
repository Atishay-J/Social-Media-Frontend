import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Cards/PostCard";
import { fetchAllPosts } from "../../features/post/postSlice";

const Feed = () => {
  const feedData = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  console.log("Feed data from feed", feedData);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div className="postsContainer">
      {feedData.posts.map((feedData) => (
        <PostCard username={feedData.username} tweet={feedData.postContent} />
      ))}
    </div>
  );
};

export default Feed;
