import DashboardNav from "../../components/dashboardNav";
import styles from "../../styles/reusable.module.css";

function Dashboard() {
  return (
    <section>
      <h1 className={styles.title}>Dashboard</h1>
      <DashboardNav page={"dashboard"} path="/dashboard" />
    </section>
  );
}

export default Dashboard;