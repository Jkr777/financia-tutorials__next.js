import LinkItem from "./link";
import styles from "./linksList.module.css";

function LinksList({ links }) {
  return (
    <div className={styles.list}>
      {links.map(c => <LinkItem key={c._id} {...c} />)}
    </div>
  )
}

export default LinksList;