import { useRouter } from "next/router";
import { useContext } from "react";
import Link from "next/link";
import NavItems from "./navItems";
import AuthContext from "../../context/auth";
import classes from "./header.module.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link href="/">
          <a className={classes.icon}>Trade<span className={classes['icon--part2']}>SMART</span></a>
        </Link>
        <NavItems path={router.pathname} auth={user} logout={logout} />
      </nav>
    </header>
  )
}

export default Header;