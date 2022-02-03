import React from "react";
import style from "./Landing.module.css";
import logo from "../../img/Pokelogo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className={style.background} />
      <div className={style.container}>
        <img className={style.logo} src={logo} alt="Logo" />
        <Link to="/home">
          <button className={style.button}>Entrar</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
