import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-cover">
      <div className="img-div">
        <img
          src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
          width="100%"
          alt="user-img"
        />
      </div>
      <Link to="/register" className="btn">
        register
      </Link>
      <Link to="/login" className="btn">
        login
      </Link>
    </div>
  );
};

export default Home;
