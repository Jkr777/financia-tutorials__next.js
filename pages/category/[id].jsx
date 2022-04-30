import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import NotificationContext from "../../context/notification";
import Image from "next/image";
import handler from "../api/categories/[id]";
import axios from "axios";
import Spinner from "../../components/spinner";
import CategoryNav from "../../components/categoryNav";
import LinksList from "../../components/linksList";
import styles from "./category.module.css";


function Category({ links, category }) {
  const [linksList, changeLinksList] = useState(links);
  const [limitNr, setLimitNr] = useState(1);
  const [option, changeOption] = useState("popular");
  const [reqStatus, changeReqStatus] = useState(false);
  const { setNotification } = useContext(NotificationContext);
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
        setNotification(error.response.data);
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
          
          changeLinksList(prev => ([...prev, ...res.data]));
        } catch (error) {
          setNotification(error.response.data);
        }
      })();
    }
  }, [limitNr])

  return (
    <section>
      <h1 className={styles.category__title}>{router.query.id}</h1>
      <div className={styles.category__img }>
        {category.imgUrl 
          ? <Image 
          src={category.imgUrl} 
          alt="category" 
          layout="fill"
          objectFit="cover"
        />  : <Spinner />}
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
  } catch  {
    return { redirect: {destination: "/"} };
  }
}

export default Category;