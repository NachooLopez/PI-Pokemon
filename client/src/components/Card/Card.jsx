import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, types }) => {
  const upperName = name[0].toUpperCase() + name.slice(1);
  const typesFE = types.map((e) => <h5>{e[0].toUpperCase() + e.slice(1)}</h5>);
  return (
    <Link to={`/pokemons/${id}`}>
      <div className={style.card}>
        <div className={style.imgCont}>
          <img src={image} alt={upperName} className={style.img} />
        </div>
        <div className={style.name_type}>
          <h1 className={style.name}>{upperName}</h1>
          <div className={style.types}>{typesFE}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
