import DashboardNav from "../dashboardNav";
import LinksList from "../linksList";
import NewCategoryForm from "../_admin/newCategoryForm";
import styles from "../../styles/reusable.module.css";

function AdminData({ page, path, data }) {
  return (
    <section>
      <h1 className={styles.title}>Admin</h1>
      <DashboardNav page={page} path={path}/>
      {path === "/admin" ? data.length ? <LinksList links={data} /> : <h2 className={styles.subtitle}>No Links</h2> : null}
      {path === "/admin/new-category" ? <NewCategoryForm /> : null}
    </section>
  )
}

export default AdminData;