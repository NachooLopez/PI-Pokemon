import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../actions";
import style from "./Details.module.css";
import logo from "../../img/Pokelogo.png";

const Details = () => {
  const params = useParams();
  const details = useSelector((state) => state.details);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(params.id));
  }, [dispatch, params.id]);

  const types = details.types?.map((e, i) => (
    <div key={i} className={style.type}>
      {e}
    </div>
  ));

  return (
    <div>
      <div className={style.header}>
        <img src={logo} alt="Pokémon logo" className={style.logo} />
      </div>
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
    </div>
  );
};

export default Details;
