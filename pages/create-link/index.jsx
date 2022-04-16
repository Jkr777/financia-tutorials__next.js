import { useState, useContext } from "react";
import handler from "../api/create-link";
import NotificationContext from "../../context/notification";
import axios from "axios";
import Categories from "../../components/_create-link/categories";
import Inputs from "../../components/_create-link/inputs";
import styles from "../../components/_auth/auth.module.css";

function CreateLink({ categories, defaultState }) {
  const [data, setData] = useState(defaultState);
  const { setNotification } = useContext(NotificationContext);

  const handleBoolsChange = e => setData(prev => ({...prev, categoryName: prev.categoryName !== e.target.name ? e.target.name : ""}));
  const handleChange = e => setData(prev => ({...prev, [e.target.name]: e.target.value}));

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('/api/create-link', data);
    } catch (error) {
      setNotification(error.response.data);
    }

    setData(defaultState);
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.container__title}>Create Link</h1>
      <p className={styles["container__sub-title"]}>Your link can be approved or rejectected.</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Inputs handleChange={handleChange} formData={data} style={styles.form__input} />
        <Categories handleChange={handleBoolsChange} formData={data} list={categories} />
        <button className={styles.form__btn}>Create</button>
      </form>
    </section>
  );
}

CreateLink.defaultProps = {
  defaultState: {
    title: "",
    url: "",
    categoryName: ""
  }
};

export async function getServerSideProps(context) {
  try {
    const categories = await handler(context.req, context.res);
    return {
      props: {categories: JSON.parse(categories)}
    }

  } catch { 
    return { redirect: {destination: "/"} };
  }
}


export default CreateLink;