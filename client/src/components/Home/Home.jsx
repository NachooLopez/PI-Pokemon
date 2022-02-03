import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import Card from "../Card/Card";

const data = [
  {
    id: 1,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    hp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
    height: 7,
    weight: 69,
  },
  {
    id: 2,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
    name: "Ivysaur",
    types: ["Grass", "Poison"],
    hp: 60,
    attack: 62,
    defense: 63,
    speed: 60,
    height: 10,
    weight: 130,
  },
];

const Home = () => {
  return (
    <div className={styles.outer}>
      {data.map(({ name, types }) => {
        return <Card name={name} types={types} />;
      })}
    </div>
  );
};

export default Home;
