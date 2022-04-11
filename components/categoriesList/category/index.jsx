import Link from "next/link";
import styles from "./category.module.css";

function Category({ categoryName }) {
  return (
    <Link href={`/category/${categoryName}`}>
      <span className={styles.category}>
        {categoryName}
      </span>
    </Link>

  )
}

export default Category;