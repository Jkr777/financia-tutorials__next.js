import { useState, useEffect } from "react";
import axios from "axios";
import DashboardNav from "../dashboardNav";
import AdminLinksList from "./links";
import NewCategoryForm from "../_admin/newCategoryForm";
import styles from "../../styles/reusable.module.css";

function AdminData({ page, path, data }) {
  const [listData, setListData] = useState(data);

  async function handleValidation(id) {
    try {
     await axios.patch('/api/admin', {id});
      setListData(prev => prev.filter(i => i._id !== id));
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function handleRemove(id) {
    try {
      await axios.delete('/api/admin', {data: {id}});
      setListData(prev => prev.filter(i => i._id !== id));
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <section>
      <h1 className={styles.title}>Admin</h1>
      <DashboardNav page={page} path={path}/>
      {path === "/admin" ? listData.length ? <AdminLinksList handleValidation={handleValidation} handleRemove={handleRemove} links={listData} /> : <h2 className={styles.subtitle}>No Links</h2> : null}
      {path === "/admin/new-category" ? <NewCategoryForm /> : null}
    </section>
  )
}

export default AdminData;