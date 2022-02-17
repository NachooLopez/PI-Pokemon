import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getById } from "../../actions";
import styles from "./Details.module.css";
import logo from "../../img/Pokelogo.png";
import nothingFound from "../../img/sad_bulbasaur.png";
import Loading from "../Loading/Loading";

const Details = () => {
  const params = useParams();
  const { details, loading } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(params.id));
  }, [dispatch, params.id]);

  const types = details.types?.map((e) => (
    <div key={e} className={styles.type}>
      {e[0].toUpperCase() + e.slice(1)}
    </div>
  ));

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className={styles.header}>
        <Link to="/home">
          <img src={logo} alt="Pokémon logo" className={styles.logo} />
        </Link>
      </div>
      {details.hasOwnProperty("error") ? (
        <div className={styles.error}>
          <img
            src={nothingFound}
            alt="Pokémon not found!"
            className={styles.nothing}
          />
          <span className={styles.message}>Pokémon not found!</span>
        </div>
      ) : (
        <div className={styles.details}>
          <div className={styles.name}>{details.name}</div>
          <div className={styles.imgContainer}>
            <img
              src={details.image}
              alt={details.name}
              className={styles.img}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.types}>{types}</div>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>HP:</strong> {details.hp}
            </div>
            <div className={styles.stat}>
              <strong>Attack:</strong> {details.attack}
            </div>
            <div className={styles.stat}>
              <strong>Defense:</strong> {details.defense}
            </div>
            <div className={styles.stat}>
              <strong>Speed:</strong> {details.speed}
            </div>
            <div className={styles.stat}>
              <strong>Height:</strong> {details.height}
            </div>
            <div className={styles.stat}>
              <strong>Weight:</strong> {details.weight}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
