import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, image, types }) => {
  const upperName = name?.charAt(0).toUpperCase() + name.slice(1);
  const typesMapped = types?.map((e) => (
    <h5 key={e}>{e[0].toUpperCase() + e.slice(1)}</h5>
  ));

  return (
    <Link to={`/pokemons/${id}`}>
      <div className={styles.card}>
        <div className={styles.imgCont}>
          <img src={image} alt={upperName} className={styles.img} />
        </div>
        <div className={styles.name_type}>
          <h1 className={styles.name}>{upperName}</h1>
          <div className={styles.types}>{typesMapped}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
