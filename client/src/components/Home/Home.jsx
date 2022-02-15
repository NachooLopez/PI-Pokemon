import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getPokemons,
  orderByAlphabet,
  filterByType,
  filterByOrigin,
  orderByStrength,
  findByName,
  clearDetails,
} from "../../actions/index";
import styles from "./Home.module.css";
import Cards from "../Cards/Cards";
import Loading from "../Loading/Loading";
import logo from "../../img/Pokelogo.png";
import nothingFound from "../../img/sad_bulbasaur.png";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const Home = () => {
  const { types, pokemons, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    dispatch(clearDetails());
  }, [dispatch]);

  const handleFilterByType = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByType(e.target.value));
  };

  const handleFilterByOrigin = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByOrigin(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByAlphabet(e.target.value));
  };

  const handleOrderByStrength = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByStrength(e.target.value));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(findByName(e.target[0].value));
  };

  const handlePagination = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.value);
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className={styles.header}>
        <Link to="/home">
          <img src={logo} alt="Pokémon Logo" className={styles.logo} />
        </Link>
      </div>
      <Link to="/create">
        <button>Create your own Pokémon!</button>
      </Link>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Find a Pokémon!" name="search" />
        <button>GO!</button>
      </form>
      <div className={styles.filter}>
        <select
          name="filterByType"
          onChange={handleFilterByType}
          className={styles.selector}
        >
          <option value="all">Select type</option>
          {types?.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name[0].toUpperCase() + e.name.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="filterByOrigin"
          onChange={handleFilterByOrigin}
          className={styles.selector}
        >
          <option value="all">Select origin</option>
          <option value="api">Existent</option>
          <option value="database">Created</option>
        </select>
        <select
          name="name"
          onChange={handleOrderByName}
          className={styles.selector}
        >
          <option value="all">Order by name</option>
          <option value="a-z">Ascendent / A-Z</option>
          <option value="z-a">Descendent / Z-A</option>
        </select>
        <select
          name="attack"
          onChange={handleOrderByStrength}
          className={styles.selector}
        >
          <option value="all">Order by strength</option>
          <option value="attackAsc">Weaker to stronger</option>
          <option value="attackDes">Stronger to weaker</option>
        </select>
      </div>
      {pokemons.length ? (
        <main>
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            numberOfPokemons={pokemons.length}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
          <Cards pokemons={currentPokemons} />
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            numberOfPokemons={pokemons.length}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </main>
      ) : (
        <div className={styles.error}>
          <img
            src={nothingFound}
            alt="Pokémon not found!"
            className={styles.nothing}
          />
          <span className={styles.message}>Pokémon not found!</span>
        </div>
      )}
    </div>
  );
};

export default Home;
