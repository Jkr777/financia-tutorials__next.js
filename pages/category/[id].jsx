import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import handler from "../api/categories/[id]";
import axios from "axios";
import CategoryNav from "../../components/categoryNav";
import LinksList from "../../components/linksList";
import styles from "./category.module.css";


function Category({ links, category }) {
  const [linksList, changeLinksList] = useState(links);
  const [option, changeOption] = useState("popular");
  const mounted = useRef(false);
  const router = useRouter();

  async function handleChange(optionName) {
    changeOption(optionName);
  }

  async function handleMore() {
    
  }

  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true;
      return;
    } 

    (async function() {
      try {
        const res = await axios.get(`/api/categories/${category.categoryName}/?sortOption=${option}`);
        console.log(res.data)
        changeLinksList(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [option])

  return (
    <section>
      <h1 className={styles.category__title}>{router.query.id}</h1>
      <div className={styles.category__img }>
        <Image 
          src={category.imgUrl} 
          alt="category" 
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className={styles.category__text}>{category.info}</p>
      <CategoryNav option={option} handleChange={handleChange} />
      <LinksList links={linksList} />
      <span>more</span>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await handler(context.req, context.res, context.params);

    return {
      props: {
        ...JSON.parse(res)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default Category;