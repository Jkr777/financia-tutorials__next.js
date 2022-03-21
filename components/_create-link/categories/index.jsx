import styles from "./categories.module.css";

function Categories({ list, handleChange }) {
  return (
    <div className={styles.container}>
      <span className={styles.container__title}>Category</span>
      {list.map(e => (
        <div key={e._id} className={styles.container__categories}>
          <input 
            name={e.category}
            id={e.category}
            type="checkbox"
            onChange={handleChange}
          />
          <label forhtml={e.category} className={styles.container__category}>
            {e.category} 
          </label>
        </div>
      ))}
    </div>
  );
}

export default Categories; 