import { useContext } from "react";
import Header from "../header";
import NotificationContext from "../../context/notification";
import classes from "./layout.module.css";

function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <Header />
      <main className={classes.main}>{ children }</main>
      {<p className={notification ? classes["notification--active"] : classes["notification--invisible"]}>{notification}</p>}
    </>
  )
}

export default Layout;