import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const Provider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  async function checkLoggedInUser() {
    const resp = await axios.get("http://localhost:4000/api/v1/verifytoken");
    setIsLoggedIn(resp.data);
  }

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Provider;
