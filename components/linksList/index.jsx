import LinkItem from "./link";
import styles from "./linksList.module.css";

function LinksList({ links }) {
  return (
    <div className={styles.list}>
      {links.map(e => <LinkItem key={e._id} {...e} />)}
    </div>
  )
}

export default LinksList;