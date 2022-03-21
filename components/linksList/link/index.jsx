import Link from "next/link";
import styles from "./link.module.css";

function LinkItem({ title, url, date, category, clicks }) {
  return (
    <Link href={url}>
    <div className={styles.item}>
      <div className={styles.item__left }>
        <span className={styles.item__title}>{title}</span>
        <span className={styles.item__url}>{url}</span>
        <span>{category}</span>
      </div>      
      <div className={styles.item__right}>
        <span className={styles.item__date}>{date}</span>
        <span className={styles.item__clicks}> clicks {clicks}</span>
      </div>
    </div>
    </Link>
  )
}

export default LinkItem;