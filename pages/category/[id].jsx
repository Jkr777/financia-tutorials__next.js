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
  const [limitNr, setLimitNr] = useState(1);
  const [option, changeOption] = useState("popular");
  const [reqStatus, changeReqStatus] = useState(false);
  const mounted = useRef(false);
  const router = useRouter();

  async function handleChange(optionName) {
    changeOption(optionName);
  }

  async function handleMore() {
    if(reqStatus) return;
    setLimitNr(prev => prev + 1);
  }

  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true;
      return;
    } 

    (async function() {
      try {
        const res = await axios.get(`/api/categories/${category.categoryName}/?sortOption=${option}`);

        changeLinksList(res.data);
        setLimitNr(1);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [option])

  useEffect(() => {
    if(limitNr > 1) {
      (async function() {
        try {
          const res = await axios.get(`/api/categories/${category.categoryName}/?sortOption=${option}&limit=${limitNr}`);
          if(!res.data.length) {
            changeReqStatus(true);
          }
          console.log("moreeeeeeeeeee")
          changeLinksList(prev => ([...prev, ...res.data]));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [limitNr])

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
      <span onClick={handleMore} className={styles.category__link}>more</span>
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