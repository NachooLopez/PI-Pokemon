import React from "react";
import styles from "./Pagination.module.css";

const Paginado = ({
  pokemonsPerPage,
  numberOfPokemons,
  handlePagination,
  currentPage,
}) => {
  const numbersOfPage = [];

  for (let i = 1; i <= Math.ceil(numberOfPokemons / pokemonsPerPage); i++) {
    numbersOfPage.push(i);
  }
  return (
    <div className={styles.pagination}>
      {numbersOfPage.map((e) => (
        <button
          key={e}
          onClick={handlePagination}
          value={e}
          className={styles.button}
          disabled={parseInt(currentPage) === e}
        >
          {e}
        </button>
      ))}
    </div>
  );
};

export default Paginado;
