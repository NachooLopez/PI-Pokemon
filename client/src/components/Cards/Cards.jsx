import React from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

const Cards = ({ pokemons }) => {
  return (
    <div className={styles.cards}>
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          image={pokemon.image}
          name={pokemon.name}
          types={pokemon.types}
        />
      ))}
    </div>
  );
};

export default Cards;
