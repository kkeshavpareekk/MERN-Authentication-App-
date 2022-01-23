import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { checkLoggedInUser } = useContext(AuthContext);

  const Navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });
      await checkLoggedInUser();
      Navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <p style={{color: "red", fontSize: "1.1rem"}}>{error && <>{error} </>}</p>
        <input
          type="email"
          placeholder="Email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          login
        </button>
      </form>
      <span style={{ fontSize: "1rem", display: "block", textAlign: "right" }}>
        New user?<Link to="/register" style={{ textDecoration: "none" }}>register</Link>
      </span>
    </div>
  );
};

export default LoginForm;
