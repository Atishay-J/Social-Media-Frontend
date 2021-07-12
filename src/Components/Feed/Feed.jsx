import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Cards/PostCard";
import { fetchAllPosts } from "../../features/post/postSlice";
import useSortByTime from "../../hooks/useSortByTime";

const Feed = () => {
  const { posts, postStatus, uploadStatus } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  console.log("Feed data from feed", posts);

  const sortedFeed = useSortByTime(posts);

  console.log("Sorted Feed ", sortedFeed);

  useEffect(() => {
    console.log("FEEEDD KKAAA STATUSSS ", postStatus);
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, []);

  return (
    <div className="postsContainer">
      {postStatus === "loading" && <h1>Loading...</h1>}
      {uploadStatus === "loading" && <h1>Uploading...</h1>}
      {postStatus === "fulfilled" && (
        <>
          {sortedFeed?.map((postData) => (
            <PostCard
              key={postData._id}
              postUsername={postData.username}
              avatar={postData.avatar}
              post={postData.postContent}
              postTime={postData.createdAt}
              postId={postData._id}
              postLikes={postData.likes}
              postImg={postData.postImg}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
