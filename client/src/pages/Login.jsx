import { useState } from "react";
import API from "../services/api";
import styles from "../styles/login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }
      alert("Login Successfull");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin email:viveksh94108@gmail.com</h1>
      <h1>Admin password:123456</h1>
      <div className={styles.box}>
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <p className={styles.link}>
          Don't have an account ? <Link to="/">signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
