const SearchCard = ({ avatar, firstname, lastname, bio, username }) => {
  console.log("Search Card", { avatar, firstname, lastname, bio, username });

  return (
    <div>
      <div>
        <img src={avatar} alt="avatar" />
      </div>
      <div>
        <h3>
          {firstname} {lastname}
        </h3>
        <h4>{username}</h4>
      </div>
      <div>{bio}</div>
    </div>
  );
};
export default SearchCard;
