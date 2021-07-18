import BottomNav from "../../Navbars/Bottom Navs/BottomNav";
import { authAxios } from "../../../Utils/authAxios";
import { useEffect, useState } from "react";
import SearchCard from "../../Cards/SearchCard";
import styles from "./searchPage.module.css";
import { Search } from "react-bootstrap-icons";
import TopNav from "../../Navbars/Top Navs/TopNav";
import useSortByTime from "../../../hooks/useSortByTime";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../../../features/post/postSlice";
import PostCard from "../../Cards/PostCard";

const SearchPage = () => {
  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState({
    status: "idle",
    data: "",
  });
  const { posts, postStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const searchUser = async () => {
    setSearchResults({ data: "", status: "loading" });
    await authAxios
      .post("/search", { username: userInput })
      .then((res) => {
        setSearchResults({ data: res.data, status: "fulfilled" });
      })
      .catch((err) => {
        console.log("Search Error ", err);
        setSearchResults({ data: "", status: "error" });
      });
  };

  const sortedFeed = useSortByTime(posts);

  useEffect(() => {
    setSearchResults({ status: "idle", data: "" });
  }, []);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, []);

  return (
    <>
      <TopNav />
      <div className={styles.searchPageContainer}>
        <div className={styles.searchbarWrapper}>
          <input
            className={styles.searchBox}
            type="text"
            value={userInput}
            placeholder="Username"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={searchUser}>
            <Search />
          </button>
        </div>

        <div className={styles.searchResultsWrapper}>
          {searchResults.status === "idle" && (
            <h2 className={styles.searchSuggestion}>
              Try searching for "Elon"
            </h2>
          )}
          {searchResults.status === "loading" && <h3>Loading...</h3>}
          {searchResults.status === "fulfilled" && (
            <SearchCard
              avatar={searchResults.data.avatar}
              firstname={searchResults.data.firstname}
              lastname={searchResults.data.lastname}
              username={searchResults.data.username}
              bio={searchResults.data.bio}
            />
          )}
          {searchResults.status === "error" && <h3>User does not Exist</h3>}
        </div>

        <div className={styles.exploreContainer}>
          <h4 className={styles.exploreText}>Trending in Community </h4>
          <div className={styles.exploreFeedWrapper}>
            {sortedFeed.map((postData) => (
              <PostCard
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
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
};
export default SearchPage;
