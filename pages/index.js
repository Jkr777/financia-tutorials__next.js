import CategoriesList from "../components/categoriesList";
import LinksList from "../components/linksList";
import styles from '../styles/reusable.module.css'
import helpers from '../styles/helpers.module.css'

import { DUMMY_LINKS, DUMMY_CATEGORIES } from "../dev/linksData";

function Home() {
  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Find the Best Trading Courses & Tutorials</h1>
        <p>Not all courses are created equal. They can vary widely in terms of the instructors' experience and track record, the course structure, the quality and quantity of learning tools and resources, and the value you receive for your time and money. Some are outright scams. In this roundup, we increase the chances you'll find a high-quality course that can set you on the path to success.</p>
      </section>
      <section className={helpers.container}>
        <h2 className={styles.subtitle}>Categories</h2>
        <CategoriesList categories={DUMMY_CATEGORIES} />
      </section>
      <section className={styles.container}>
        <h2 className={styles.subtitle}>Trending Courses & Tutorials</h2>
        <LinksList links={DUMMY_LINKS} />
      </section>
    </>  
  )
}

export default Home;