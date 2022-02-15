import React from "react";
import style from "./Loading.module.css";
import loading from "../../img/loading.gif";
import { Link } from "react-router-dom";
import logo from "../../img/Pokelogo.png";

const Loading = () => {
  return (
    <div className={style.loading}>
      <Link to="/home">
        <img src={logo} alt="Pokémon Logo" className={style.logo} />
      </Link>
      <img src={loading} alt="Loading" className={style.pokeball} />
    </div>
  );
};

export default Loading;
