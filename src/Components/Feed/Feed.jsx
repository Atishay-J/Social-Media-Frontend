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

  console.log("Sorted Feed ", sortedFeed);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div className="postsContainer">
      {sortedFeed?.map((postData) => (
        <PostCard
          key={postData._id}
          postUsername={postData.username}
          avatar={postData.avatar}
          tweet={postData.postContent}
          postTime={postData.createdAt}
          postId={postData._id}
          postLikes={postData.likes}
        />
      ))}
    </div>
  );
};

export default Feed;
