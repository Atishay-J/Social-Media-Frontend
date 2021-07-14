import styles from "../Index Page/indexPage.module.css";
const PageNavbar = () => {
  return (
    <div className={styles.navbar}>
      <h2 className={styles.logo}>
        Social Meta<span className={styles.logoBackdrop}>phor</span>
      </h2>
    </div>
  );
};
export default PageNavbar;
