import Link from "next/link";
import classes from "./navItems.module.css";

function NavItems({ path, auth, logout }) {
  return (
    <div>
      { auth ? <>
        {auth.role === "admin" ? <Link href="/admin">
            <a className={path === "/admin" ? classes['link--active'] : classes.link}>Admin</a>
          </Link>          
          : null
         }
        <Link href="/create-link">
          <a className={path === "/create-link" ? classes['link--active'] : classes.link}>Create Link</a>
        </Link>          
        
        <Link href="/dashboard">
          <a className={path === "/dashboard" ? classes['link--active'] : classes.link}>Dashboard</a>
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