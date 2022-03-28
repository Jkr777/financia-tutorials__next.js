import DashboardNav from "../dashboardNav";
import LinksList from "../linksList";
import styles from "../../styles/reusable.module.css";

function AdminData({ path, data }) {
  if(path === "/admin") {
    return (
      <section>
        <h1 className={styles.title}>Admin</h1>
        <DashboardNav page={"admin"} path={"/admin"}/>
      </section>
    );
  }
}

export default AdminData;