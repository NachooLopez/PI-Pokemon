import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getById } from "../../actions";
import style from "./Details.module.css";
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
    <div key={e} className={style.type}>
      {e[0].toUpperCase() + e.slice(1)}
    </div>
  ));

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className={style.header}>
        <Link to="/home">
          <img src={logo} alt="Pokémon logo" className={style.logo} />
        </Link>
      </div>
      {details.hasOwnProperty("error") ? (
        <div className={style.error}>
          <img
            src={nothingFound}
            alt="Pokémon not found!"
            className={style.nothing}
          />
          <span className={style.message}>Pokémon not found!</span>
        </div>
      ) : (
        <div className={style.details}>
          <div className={style.name}>{details.name}</div>
          <div className={style.imgContainer}>
            <img src={details.image} alt={details.name} className={style.img} />
          </div>
          <div className={style.info}>
            <div className={style.types}>{types}</div>
          </div>
          <div className={style.stats}>
            <div className={style.stat}>HP: {details.hp}</div>
            <div className={style.stat}>Attack: {details.attack}</div>
            <div className={style.stat}>Defense: {details.defense}</div>
            <div className={style.stat}>Speed: {details.speed}</div>
            <div className={style.stat}>Height: {details.height}</div>
            <div className={style.stat}>Weight: {details.weight}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
