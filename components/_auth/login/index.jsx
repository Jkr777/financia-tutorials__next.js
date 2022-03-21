import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth";
import Link from "next/link";
import styles from "../auth.module.css";

function Login({ setFormPath }) {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { login, error } = useContext(AuthContext);

  const handleChange = e => setData(prev => ({...prev, [e.target.name]: e.target.value}));

  useEffect(() => {
    if(error) {
      console.log(error);
    }
  },  [error])

  function handleSubmit(e) {
    e.preventDefault()
    login(data); 
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Log In</h1>
      <form onSubmit={handleSubmit} className={styles.form}> 
        <input 
          className={styles.form__input}
          name="email"
          type="email"
          maxLength="255"
          minLength="3"
          required
          autoFocus
          placeholder="email"
          autoComplete="email"
          value={data.email}
          onChange={handleChange}
        />        
        
        <input 
          className={styles.form__input}
          name="password"
          type="password"
          maxLength="255"
          minLength="3"
          required
          placeholder="password"
          autoComplete="current-password"
          value={data.password}
          onChange={handleChange}
        />

        <button className={styles.form__btn}>Log In</button>
        <Link href="/reset">
          <a className={styles.form__link}>Forgot Password ?</a>
        </Link>
        <span>Don't have an account ? <a className={styles.form__link} onClick={() => setFormPath("register")}>Register</a></span>
      </form>
    </div>
  );
}

export default Login;