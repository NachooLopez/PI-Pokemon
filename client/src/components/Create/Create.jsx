import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTypes, createPokemon, getPokemons } from "../../actions";
import logo from "../../img/Pokelogo.png";
import style from "./Create.module.css";

const validate = (input) => {
  const error = {};
  const validName = /^[a-zA-ZñÑ]+$/i;
  const validNum = /^\d+$/;
  const validUrl = /^(ftp|http|https):\/\/[^ "]+\.\S+$/;

  if (!input.name) error.name = "Name is required.";
  else if (!validName.test(input.name))
    error.name = "Name can only contain letters.";
  else if (input.name.length < 4)
    error.name = "Name must have a minimum length of 4.";

  if (!validUrl.test(input.image) && input.image)
    error.image = "Image field must have a valid URL or be empty.";

  if (
    !validNum.test(input.hp) ||
    parseInt(input.hp) < 5 ||
    parseInt(input.hp) > 255
  )
    error.hp = "HP must be a number between 5 and 255.";

  if (
    !validNum.test(input.attack) ||
    parseInt(input.attack) < 5 ||
    parseInt(input.attack) > 190
  )
    error.attack = "Attack must be a number between 5 and 190.";

  if (
    !validNum.test(input.defense) ||
    parseInt(input.defense) < 5 ||
    parseInt(input.defense) > 250
  )
    error.defense = "Defense must be a number between 5 and 250.";

  if (
    !validNum.test(input.speed) ||
    parseInt(input.speed) < 5 ||
    parseInt(input.speed) > 200
  )
    error.speed = "Speed must be a number between 5 and 200.";

  if (
    !validNum.test(input.height) ||
    parseInt(input.height) < 5 ||
    parseInt(input.height) > 1000
  )
    error.height = "Height must be a number between 5 and 1000.";

  if (
    !validNum.test(input.weight) ||
    parseInt(input.weight) < 5 ||
    parseInt(input.weight) > 10000
  )
    error.weight = "Weight must be a number between 5 and 10000.";

  if (input.types.length <= 0 || input.types.length > 2)
    error.types = "Pokémons must have one or two types.";

  return error;
};

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { types, allPokes } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "0",
    attack: "0",
    defense: "0",
    speed: "0",
    height: "0",
    weight: "0",
    types: [],
  });

  const resetInput = () => {
    setInput({
      name: "",
      image: "",
      hp: "0",
      attack: "0",
      defense: "0",
      speed: "0",
      height: "0",
      weight: "0",
      types: [],
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      allPokes.some((e) => e.name.toLowerCase() === input.name.toLowerCase())
    ) {
      alert("That name already exists!");
    } else if (!Object.keys(errors).length && input.name.length) {
      dispatch(createPokemon(input));
      resetInput();
      alert("Pokémon created succesfully!");
      navigate("/home");
    } else alert("Please, check the form!");
  };

  const handleInput = (e) => {
    if (e.target.name === "types") {
      if (!input.types.includes(e.target.value)) {
        setInput({
          ...input,
          types: [...input.types, e.target.value],
        });
      }
      setErrors(
        validate({
          ...input,
          types: [...input.types, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value, // types:
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleDelete = (type) => {
    setInput({
      ...input,
      types: input.types.filter((e) => e !== type),
    });
    setErrors(
      validate({
        ...input,
        types: input.types.filter((e) => e !== type),
      })
    );
  };

  return (
    <div>
      <Link to="/home">
        <img src={logo} alt="Pokémon logo" className={style.logo} />
      </Link>
      <div className={style.details}>
        <h1>Create your pokémon!</h1>
        <form onSubmit={handleSubmit} className={style.stats}>
          <div className={style.nameDiv}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              id="name"
              onChange={handleInput}
            />
            {errors.name && (
              <em className={style.errorMessage}>{errors.name}</em>
            )}
          </div>
          <div className={style.imageDiv}>
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              id="image"
              onChange={handleInput}
            />
            {errors.image && (
              <em className={style.errorMessage}>{errors.image}</em>
            )}
          </div>
          <div className={style.stat}>
            <label htmlFor="hp">HP:</label>
            <input
              type="range"
              value={input.hp}
              name="hp"
              id="hp"
              min="0"
              max="255"
              step="1"
              onChange={handleInput}
            />
            <input
              type="number"
              onChange={handleInput}
              value={input.hp}
              name="hp"
              min="0"
              max="255"
            />
            {errors.hp && <em className={style.errorMessage}>{errors.hp}</em>}
          </div>
          <div className={style.stat}>
            <label htmlFor="attack">Attack:</label>
            <input
              type="range"
              value={input.attack}
              name="attack"
              id="attack"
              min="0"
              max="190"
              step="1"
              onChange={handleInput}
            />
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={handleInput}
              min="0"
              max="190"
            />
            {errors.attack && (
              <em className={style.errorMessage}>{errors.attack}</em>
            )}
          </div>
          <div className={style.stat}>
            <label htmlFor="defense">Defense:</label>
            <input
              type="range"
              value={input.defense}
              name="defense"
              id="defense"
              min="0"
              max="250"
              step="1"
              onChange={handleInput}
            />
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={handleInput}
              min="0"
              max="250"
            />
            {errors.defense && (
              <em className={style.errorMessage}>{errors.defense}</em>
            )}
          </div>
          <div className={style.stat}>
            <label htmlFor="speed">Speed:</label>
            <input
              type="range"
              value={input.speed}
              name="speed"
              id="speed"
              min="0"
              max="200"
              step="1"
              onChange={handleInput}
            />
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={handleInput}
              min="0"
              max="200"
            />
            {errors.speed && (
              <em className={style.errorMessage}>{errors.speed}</em>
            )}
          </div>
          <div className={style.stat}>
            <label htmlFor="height">Height:</label>
            <input
              type="range"
              value={input.height}
              name="height"
              id="height"
              min="0"
              max="1000"
              step="1"
              onChange={handleInput}
            />
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={handleInput}
              min="0"
              max="1000"
            />
            {errors.height && (
              <em className={style.errorMessage}>{errors.height}</em>
            )}
          </div>
          <div className={style.stat}>
            <label htmlFor="weight">Weight:</label>
            <input
              type="range"
              value={input.weight}
              name="weight"
              id="weight"
              min="0"
              max="10000"
              step="1"
              onChange={handleInput}
            />
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={handleInput}
              min="0"
              max="10000"
            />
            {errors.weight && (
              <em className={style.errorMessage}>{errors.weight}</em>
            )}
          </div>
          <div className={style.types}>
            <select
              name="types"
              onChange={handleInput}
              disabled={input.types.length >= 2}
              className={style.selector}
              defaultValue="none"
            >
              <option value="none" disabled>
                Select a type!
              </option>
              {types?.map((e, i) => (
                <option key={i} value={e.name}>
                  {e.name[0].toUpperCase() + e.name.slice(1)}
                </option>
              ))}
            </select>
            <div className={style.typesList}>
              {input.types?.map((type) => (
                <div key={type} className={style.type}>
                  <span>{type}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(type)}
                    className={style.button}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            {errors.types && (
              <em className={style.errorMessage}>{errors.types}</em>
            )}
          </div>
          <input
            type="submit"
            value="Create pokémon!"
            className={style.submitButton}
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
