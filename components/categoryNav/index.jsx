import { useState } from "react";
import styles from "./categoryNav.module.css";

function CategoryNav() {
  const [nav, setNav] = useState("popular");

  const handleChange = navName => setNav(navName);

  return (
    <nav className={styles.nav}>
      <span className={nav === "popular" ? styles["nav__item--active"] : styles.nav__item } onClick={() => handleChange("popular")}>Popular</span>
      <span className={nav === "new" ?  styles["nav__item--active"] : styles.nav__item } onClick={() => handleChange("new")}>New</span>
    </nav>
  );
}

export default CategoryNav;