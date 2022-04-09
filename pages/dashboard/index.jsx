import { useState, useContext } from "react";
import handler from "../api/dashboard";
import AuthContext from "../../context/auth";
import _ from 'lodash';
import axios from "axios";
import formStyle from "../../components/_auth/auth.module.css";
import reusableStyle from "../../styles/reusable.module.css";

function Dashboard({ userName, email }) {
  const [data, setData] = useState({userName, email, password: ""});
  const { logout } = useContext(AuthContext);

  const handleChange = e => setData(prev => ({...prev, [e.target.name]: e.target.value}));

  async function handleDelete() {
    try {
      const res = await axios.delete('/api/dashboard');
      if(res) {
        logout();
      }
    } catch (error) {
      console.log("error: ", error.response.data)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newData = _.pickBy(data, _.identity);
      const res = await axios.patch('/api/dashboard', newData);
      setData(prev => ({...prev, ...res.data}));
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  }

  return (
    <section className={formStyle.container}>
      <h1 className={formStyle.container__title}>Update Profile</h1>
      <form onSubmit={handleSubmit} className={formStyle.form}>
        <input 
          className={formStyle.form__input}
          name="userName"
          type="text"
          maxLength="55"
          minLength="5"
          placeholder="userName"
          autoComplete="username"
          value={data.userName}
          onChange={handleChange}
        />          
        
        <input 
          className={formStyle.form__input}
          name="email"
          type="email"
          maxLength="255"
          minLength="5"
          placeholder="email"
          autoComplete="email"
          value={data.email}
          onChange={handleChange}
        />        
        
        <input 
          className={formStyle.form__input}
          name="password"
          type="password"
          maxLength="255"
          minLength="5"
          placeholder="password"
          autoComplete="current-password"
          value={data.password}
          onChange={handleChange}
        />

        <button className={formStyle.form__btn}>Update</button>
      </form>
      <button onClick={handleDelete} className={reusableStyle["delete-btn"]}>Delete account</button>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    let res = await handler(context.req, context.res);
    res = JSON.parse(res);

    return {
      props: { ...res }
    }

  } catch {
    return { redirect: {destination: "/"} };
  }
}

export default Dashboard;