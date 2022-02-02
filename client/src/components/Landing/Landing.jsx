import React from "react";
import style from "./Landing.module.css";
import logo from "../../img/pokemon-logoa.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.container}>
      <img className={style.logo} src={logo} alt="Logo" />
      <Link to="/home">
        <button className={style.button}>Entrar</button>
      </Link>
    </div>
  );
};

export default Landing;
