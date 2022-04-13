import { useRouter } from "next/router";
import axios from "axios";
import styles from "./link.module.css";

function LinkItem({ _id, title, url, date, categoryName, clicks }) {
  const router = useRouter();
  async function handleClick(id) {
    try {
      await axios.patch(`/api/links/${id}`);
      router.push(url);
    } catch (error) {
      console.log("errrrr");
    }
  }

  return (
    <div className={styles.item} onClick={() => handleClick(_id)}>
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
  )
}

export default LinkItem;