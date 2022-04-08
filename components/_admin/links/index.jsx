import AdminLinkItem from "./link";
import styles from "../../linksList/linksList.module.css";

function AdminLinksList({ links, handleValidation, handleRemove }) {
  return (
    <div className={styles.list}>
      {links.map(c => <AdminLinkItem key={c._id} {...c} handleValidation={handleValidation} handleRemove={handleRemove} />)}
    </div>
  )
}

export default AdminLinksList;