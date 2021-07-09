import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Cards/PostCard";
import { fetchAllPosts } from "../../features/post/postSlice";
import useSortByTime from "../../hooks/useSortByTime";

const Feed = () => {
  const feedData = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  console.log("Feed data from feed", feedData);

  const sortedFeed = useSortByTime(feedData.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div className="postsContainer">
      {sortedFeed?.map((feedData) => (
        <PostCard
          username={feedData.username}
          tweet={feedData.postContent}
          postTime={feedData.createdAt}
        />
      ))}
    </div>
  );
};

export default Feed;
