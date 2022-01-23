import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const { checkLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout_user = async () => {
    await axios.get("http://localhost:4000/api/v1/logout");
    await checkLoggedInUser();
    navigate("/");
  };
  return (
    <button className="btn" onClick={logout_user}>logout</button>
  );
};

export default LogoutBtn;
