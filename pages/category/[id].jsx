import { useRouter } from "next/router";
import Image from "next/image";
import CategoryNav from "../../components/categoryNav";
import LinksList from "../../components/linksList";
import styles from "./category.module.css";

import { DUMMY_CATEGORIES, DUMMY_LINKS } from "../../dev/linksData";

function Category() {
  const router = useRouter();
  const { info, imgUrl } = DUMMY_CATEGORIES[1];

  return (
    <section>
      <h1 className={styles.category__title}>{router.query.id}</h1>
      <div className={styles.category__img }>
        {console.log(imgUrl)}
        <Image 
          src={imgUrl} 
          alt="category" 
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className={styles.category__text}>{info}</p>
      <CategoryNav />
      <LinksList links={DUMMY_LINKS} />
    </section>
  );
}


export default Category;