import Link from "next/link";
import classes from "./navItems.module.css";

function NavItems({ path, auth, logout }) {
  return (
    <div>
      { auth ? <>
        <Link href="/create-link">
          <a className={path === "/create-link" ? classes['link--active'] : classes.link}>Create Link</a>
        </Link>  
        <a onClick={logout} className={classes.link}>Log Out</a> 
      </>
      : <Link href="/auth">
          <a className={path === "/auth" ? classes['link--active'] : classes.link}>Auth</a>
        </Link>
      }
    </div>
  );
}

export default NavItems;