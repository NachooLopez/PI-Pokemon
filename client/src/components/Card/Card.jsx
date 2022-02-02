import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, types }) => {
  const upperName = name[0].toUpperCase() + name.slice(1);
  const typesFE = types.map((e) => <h5>{e[0].toUpperCase() + e.slice(1)}</h5>);
  console.log(typesFE);
  return (
    <Link to={`/pokemons/${id}`}>
      <div className={style.card}>
        <h1 className={style.name}>{upperName}</h1>
        <img src={image} alt={upperName} className={style.img} />
        <div className={style.types}>{typesFE}</div>
      </div>
    </Link>
  );
};

export default Card;
