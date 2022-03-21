import Header from "../header";
import classes from "./layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={classes.main}>{ children }</main>
    </>
  )
}

export default Layout;