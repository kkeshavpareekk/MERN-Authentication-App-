import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./Notfound";
import Dashboard from "./Dashboard";
import AuthContext from "../context/AuthContext";

import LoginForm from "./LoginForm";
import Register from "./Register";
import Home from "./Home";

const Router = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <div className="main">
          <Routes>
            {isLoggedIn === true && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
              </>
            )}

            {isLoggedIn === false && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginForm />} />
              </>
            )}

            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Router;
