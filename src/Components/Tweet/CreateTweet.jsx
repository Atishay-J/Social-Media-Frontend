import TweetEditor from "./Tweet Editor/TweetEditor";
import styles from "./createTweet.module.css";
const CreateTweet = () => {
  return (
    <div className={styles.createTweetContainer}>
      <img
        className={styles.userAvatar}
        src="https://avatars.dicebear.com/api/micah/alex.svg"
        alt="User Avatar"
      />
      <TweetEditor />
    </div>
  );
};
export default CreateTweet;
