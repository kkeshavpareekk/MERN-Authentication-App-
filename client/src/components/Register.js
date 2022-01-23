import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./form.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [error, setError] = useState("");

  const { checkLoggedInUser } = useContext(AuthContext);
  const Navigate = useNavigate();
  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/register", {
        name,
        email,
        password,
        verifyPassword,
      });
      await checkLoggedInUser();
      Navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div className="form">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <p style={{ color: "red", fontSize: "1rem" }}>
          {error && <>{error} </>}
        </p>
        <input
          type="text"
          placeholder="Name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-box"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <button type="submit" style={{marginBottom: "0"}} className="btn">
          register
        </button>
      </form>
      <span style={{ fontSize: "1rem", display: "block", textAlign: "right" }}>
        Already registered?
        <Link to="/login" style={{ textDecoration: "none" }}>
          login
        </Link>
      </span>
    </div>
  );
};

export default Register;
