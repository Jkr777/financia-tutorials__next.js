import Link from "next/link";
import styles from "../styles/404.module.css";

function NotFoundPage() {
  return(
    <section className={styles.container}>
      <span className={styles.container__status}>404</span>
      <span className={styles.container__mess}>Ooops!</span>
      <span className={styles.container__info}>THIS PAGE DOESN'T EXIST OR IS UNAVAILABLE</span>
      <Link href="/">
        <button className={styles.container__btn}>Go Back ti Home</button>
      </Link>
    </section>
  );
}

export default NotFoundPage;