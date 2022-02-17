import React from "react";
import styles from "./Loading.module.css";
import loading from "../../img/loading.gif";
import { Link } from "react-router-dom";
import logo from "../../img/Pokelogo.png";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Link to="/home">
        <img src={logo} alt="Pokémon Logo" className={styles.logo} />
      </Link>
      <img src={loading} alt="Loading" className={styles.pokeball} />
    </div>
  );
};

export default Loading;
