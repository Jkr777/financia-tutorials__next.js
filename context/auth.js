import { createContext, useState, useEffect, Children } from "react";
import { axiosInstance } from "../utils/axios";
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => check(), []);

  // register user
  async function register(data) {
    try {
      const res = await axiosInstance.post('/api/auth/register', data);
      // manualAddToken(res.headers["tradeSmart"]);
      setUser(res.data);
    } catch(err) {
      setError(err.response.data);
    }
  }

  // login user
  async function login(data) {
    try {
      const res = await axiosInstance.post('/api/auth/login', data);
      setUser(res.data);
    } catch(err) {
      setError(err.response.data);
    }
  }

  // logout user
  async function logout() {
    console.log("logout");
  }

  // check if user is logged in
  async function check() {
    try {
      const res = await axiosInstance.get('/api/user');
      setUser(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;