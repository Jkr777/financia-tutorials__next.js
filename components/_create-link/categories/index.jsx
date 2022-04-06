import styles from "./categories.module.css";

function Categories({ list, handleChange, formData }) {
  return (
    <div className={styles.container}>
      <span className={styles.container__title}>Category</span>
      {list.map(e => (
        <div key={e._id} className={styles.container__categories}>
          <input 
            name={e.categoryName}
            id="categorie"
            type="checkbox"
            onChange={handleChange}
            checked={formData.categoryName === e.categoryName}
          />
          <label forhtml={e.category} className={styles.container__category}>
            {e.categoryName} 
          </label>
        </div>
      ))}
    </div>
  );
}

export default Categories; 