import styles from "./indexPage.module.css";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbar}>
        <h2 className={styles.logo}>
          Social Meta<span className={styles.logoBackdrop}>phor</span>
        </h2>
      </div>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Welcome to the Social Metaphor</h1>
          <div className={styles.heroPara}>
            <h3>
              Signup now <br />
              join the community
            </h3>
          </div>
        </div>

        <img
          className={styles.heroImage}
          src="https://ik.imagekit.io/utk0u9ryhxe/socialMedia/5250065_1Xn81gC8k.png"
          alt="girl with heart"
        />
        <button
          className={styles.signupBtn}
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
};
export default IndexPage;
