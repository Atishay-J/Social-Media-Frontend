import styles from "../Index Page/indexPage.module.css";
import { useNavigate } from "react-router-dom";

const PageNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <h2 className={styles.logo} onClick={() => navigate("/")}>
        Social Meta<span className={styles.logoBackdrop}>phor</span>
      </h2>
    </div>
  );
};
export default PageNavbar;
