import { useState } from "react";
import Categories from "../../components/_create-link/categories";
import Inputs from "../../components/_create-link/inputs";
import styles from "../../components/_auth/auth.module.css";

import { DUMMY_CATEGORIES } from "../../dev/linksData";

function CreateLink() {
  const [boolData, setBoolData] = useState({
    forex: false,
    stock: false,
    bonds: false,
    brokers: false
  });  
  
  const [data, setData] = useState({
    title: "",
    url: ""
  });

  const handleBoolsChange = e => setBoolData(prev => ({...prev, [e.target.name]: !prev[e.target.name]}));
  const handleChange = e => setData(prev => ({...prev, [e.target.name]: e.target.val}));

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.container__title}>Create Link</h1>
      <p className={styles["container__sub-title"]}>Your link can be approved or rejectected.</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Inputs handleChange={handleChange} formData={data} style={styles.form__input} />
        <Categories handleChange={handleBoolsChange} list={DUMMY_CATEGORIES} />
        <button className={styles.form__btn}>Create</button>
      </form>
    </section>
  )
}

export default CreateLink;