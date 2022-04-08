import Link from "next/link";
import styles from "../../../linksList/link/link.module.css";
import adminStyles from "./link.module.css";

function AdminLinkItem({ _id, title, url, date, categoryName, handleValidation, handleRemove }) {
  return (
    <>
    <div className={styles.item}>
      <div className={styles.item__left }>
        <span className={styles.item__title}>{title}</span>
        <Link href={url}>
          <span className={styles.item__url}>{url}</span>
        </Link>
        <span>{categoryName}</span>
      </div>      
      <div className={styles.item__right}>
        <span className={styles.item__date}>{new Date(date).toDateString()}</span>
      </div>
    </div>
    <div className={adminStyles.container}>
      <button onClick={() => handleValidation(_id)} className={styles["link__btn--validate"]}>validate</button>
      <button onClick={() => handleRemove(_id)} className={styles["link__btn--remove"]}>remove</button>
      </div>
    </>
  );
}

export default AdminLinkItem;