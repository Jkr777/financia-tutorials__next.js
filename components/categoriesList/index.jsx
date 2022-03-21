import Category from "./category";
import styles from "./categoriesList.module.css";

function CategoriesList({ categories }) {
  return (
    <div className={styles.list}>
      {categories.map(c => <Category key={c._id} {...c} />)}
    </div>
  )
}

export default CategoriesList;