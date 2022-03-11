import React from "react";
// import styles from "./Landing.module.css";
import logo from "../../img/Pokelogo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div />
      <div>
        <img src={logo} alt="Logo" />
        <Link to="/home">
          <button>Entrar</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
