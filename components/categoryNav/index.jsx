import styles from "./categoryNav.module.css";

function CategoryNav({ option, handleChange }) {
  return (
    <nav className={styles.nav}>
      <span className={option === "popular" ? styles["nav__item--active"] : styles.nav__item } onClick={() => handleChange("popular")}>Popular</span>
      <span className={option === "new" ?  styles["nav__item--active"] : styles.nav__item } onClick={() => handleChange("new")}>New</span>
    </nav>
  );
}

export default CategoryNav;