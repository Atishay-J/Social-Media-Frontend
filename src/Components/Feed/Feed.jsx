import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Cards/PostCard";
import { fetchAllPosts } from "../../features/post/postSlice";
import useSortByTime from "../../hooks/useSortByTime";
import PostLoaderCard from "../Cards/PostLoaderCard";

const Feed = () => {
  const [userFeed, setUserFeed] = useState([]);
  const { posts, postStatus, uploadStatus } = useSelector(
    (state) => state.posts
  );

  const { loggedInUserData } = useSelector((state) => state.userData);

  const updateFeed = () => {
    loggedInUserData.following.map((following) => {
      let post = posts.filter((post) => {
        return (
          post.username === following ||
          post.username === loggedInUserData.username
        );
      });

      return setUserFeed(() => [...post]);
    });
  };

  const dispatch = useDispatch();

  const sortedFeed = useSortByTime(userFeed);

  useEffect(() => {
    if (postStatus === "fulfilled" || uploadStatus === "fulfilled") {
      updateFeed();
    }
  }, [postStatus, uploadStatus]);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, []);

  return (
    <div className="postsContainer" style={{ paddingBottom: "5rem" }}>
      {postStatus === "loading" && <PostLoaderCard />}
      {uploadStatus === "loading" && (
        <h1 className="loadingStatus">Uploading...</h1>
      )}
      {postStatus === "fulfilled" && (
        <>
          {sortedFeed?.map((postData) => (
            <PostCard
              // key={`${postData._id}post`}
              key={postData._id}
              postUsername={postData.username}
              postFirstname={postData.firstname}
              postLastname={postData.lastname}
              postAuthorId={postData.userId}
              avatar={postData.avatar}
              post={postData.postContent}
              postTime={postData.createdAt}
              postId={postData._id}
              postLikes={postData.likes}
              postComments={postData.comments}
              postImg={postData.postImg}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
