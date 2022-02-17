import React from "react";
import styles from "./Landing.module.css";
import logo from "../../img/Pokelogo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className={styles.background} />
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <Link to="/home">
          <button className={styles.button}>Entrar</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
