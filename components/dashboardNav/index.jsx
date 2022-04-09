import { useState } from "react";
import Link from "next/link";
import styles from "./dashboardNav.module.css";

function DashboardNav({ page, path }) {
  const [nav, setNav] = useState({
    admin: [
      {
        name: "Links",
        path: '/admin'
      },
      {
        name: "New Category",
        path: '/admin/new-category'
      }
    ],
    category: [
      {
        name: "Popular",
        path: '/category'
      },
      {
        name: "New",
        path: '/category/popular'
      }
    ]                 
  });

  // function handleClick(name) {
  //   setNav(prev => ({ ...prev, [page]: prev[page].map(e => {
  //     return e.name === name ? {...e, clicked: !e.clicked} : { ...e, clicked: false }
  //   }) }));
  // }

  return (
    <nav className={styles.nav}>
      {nav[page].map(e => <Link key={e.name + e.path} href={e.path}>
        <a className={e.path === path ? styles['nav__link--active'] : styles.nav__link }>{e.name}</a>
      </Link>)}
    </nav>
  );
}

export default DashboardNav;