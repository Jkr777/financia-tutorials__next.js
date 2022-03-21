import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth";
import styles from "../auth.module.css";

function Register({ setFormPath }) {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: ""
  });
  const { register, error } = useContext(AuthContext);
 
  const handleChange = e => setData(prev => ({...prev, [e.target.name]: e.target.value}));

  useEffect(() => {
    if(error) {
      console.log(error);
    }
  }, [error])

  function handleSubmit(e) {
    e.preventDefault();
    register(data);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          className={styles.form__input}
          name="userName"
          type="text"
          maxLength="55"
          minLength="5"
          required
          autoFocus
          placeholder="userName"
          autoComplete="username"
          value={data.userName}
          onChange={handleChange}
        />          
        
        <input 
          className={styles.form__input}
          name="email"
          type="email"
          maxLength="255"
          minLength="5"
          required
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
          minLength="5"
          required
          placeholder="password"
          autoComplete="current-password"
          value={data.password}
          onChange={handleChange}
        />

        <button className={styles.form__btn}>Register</button>
        <span>Already have an account? <a className={styles.form__link} onClick={() => setFormPath("login")}>Log In</a></span>
      </form>
    </div>
  );
}

export default Register;