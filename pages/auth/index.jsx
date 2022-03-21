import { useState } from "react";
import Login from "../../components/_auth/login";
import Register from "../../components/_auth/register";

function Auth() {
  const [formName, setFormName] = useState("login");

  const handleChange = name => setFormName(name);

  return (
    <>
      {formName === "login" ? <Login setFormPath={handleChange} /> : <Register setFormPath={handleChange} />}
    </>
  )
}

export default Auth;