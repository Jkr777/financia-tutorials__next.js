import Link from "next/link";
import styles from "./link.module.css";

function LinkItem({ title, url, date, categoryName, clicks }) {
  return (
    <Link href={url}>
    <div className={styles.item}>
      <div className={styles.item__left }>
        <span className={styles.item__title}>{title}</span>
        <span className={styles.item__url}>{url}</span>
        <span>{categoryName}</span>
      </div>      
      <div className={styles.item__right}>
        <span className={styles.item__date}>{new Date(date).toDateString()}</span>
        <span className={styles.item__clicks}> clicks {clicks}</span>
      </div>
    </div>
    </Link>
  )
}

export default LinkItem;