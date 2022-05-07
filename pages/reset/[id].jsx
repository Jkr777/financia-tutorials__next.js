import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import NotificationContext from "../../context/notification";
import authFormStyles from "../../components/_auth/auth.module.css";

function Reset() {
  const [password, newPassword] = useState("");
  const { setNotification } = useContext(NotificationContext);
  const { query:{ id } } = useRouter();

  const handleNewPassword = e => newPassword(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const w = await axios.post(`/api/reset/${id}`, {password});

      setNotification("Your password has been changed");
    } catch (error) {
      setNotification(error.response.data);
    }

    newPassword("");
  }

  return (
    <section className={authFormStyles.container}>
      <h1 className={authFormStyles.container__title}>Add a new password</h1>
      <form className={authFormStyles.form} onSubmit={handleSubmit}>
      <input
          className={authFormStyles.form__input}
          name="password"
          type="password"
          maxLength="255"
          minLength="5"
          required
          placeholder="password"
          autoComplete="current-password"
          value={password}
          onChange={handleNewPassword}
        />
      <button className={authFormStyles.form__btn}>Rsset</button>
      </form>
    </section>
  );
}

export default Reset;