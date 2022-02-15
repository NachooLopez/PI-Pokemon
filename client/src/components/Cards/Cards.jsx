import React from "react";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import styles from "./Cards.module.css";

const Cards = ({ pokemons, loading }) => {
  return loading ? (
    <Loading />
  ) : pokemons.length ? (
    <div className={styles.cards}>
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          image={pokemon.image}
          name={pokemon.name}
          types={pokemon.types}
          created={pokemon.created}
        />
      ))}
    </div>
  ) : (
    <div>Nothing to show!</div>
  );
};

export default Cards;
