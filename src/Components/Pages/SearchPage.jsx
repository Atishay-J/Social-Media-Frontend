import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import { authAxios } from "../../Utils/authAxios";
import { useEffect, useState } from "react";
import SearchCard from "../Cards/SearchCard";

const SearchPage = () => {
  const [userInput, setUserInput] = useState("");
  const [searchResults, setSearchResults] = useState({
    status: "idle",
    data: "",
  });

  const searchUser = async () => {
    setSearchResults({ data: "", status: "loading" });
    await authAxios
      .post("/search", { username: userInput })
      .then((res) => {
        console.log("Search Response ===> ", res);
        setSearchResults({ data: res.data, status: "fulfilled" });
      })
      .catch((err) => {
        console.log("Search Error ", err);
        setSearchResults({ data: "", status: "error" });
      });
  };

  useEffect(() => {
    setSearchResults({ status: "idle", data: "" });
  }, []);

  return (
    <div className="searchPageContainer">
      <h1>I am Search Page</h1>
      <input
        type="text"
        value={userInput}
        placeholder="Username"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={searchUser}>Search</button>

      <div>
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

      <BottomNav />
    </div>
  );
};
export default SearchPage;