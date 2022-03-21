import Link from "next/link";
import styles from "./category.module.css";

function Category({ category }) {
  return (
    <Link href={`/category/${category}`}>
      <span className={styles.category}>
        {category}
      </span>
    </Link>

  )
}

export default Category;