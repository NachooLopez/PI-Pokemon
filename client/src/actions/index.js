import axios from "axios";

export const getPokemons = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/pokemons")
      .then((pokemons) => {
        dispatch({ type: "GET_POKEMONS", payload: pokemons.data });
      })
      .catch((e) => console.log(e));
  };
};

export const findByName = (name) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/pokemons?name=${name}`)
      .then((pokemon) => {
        dispatch({ type: "GET_POKEMON_BY_NAME", payload: pokemon.data });
      })
      .catch((e) => console.log(e));
  };
};

export const getById = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/pokemons${id}`)
      .then((pokemon) => {
        dispatch({ type: "GET_POKEMON_BY_ID", payload: pokemon.data });
      })
      .catch((e) => console.log(e));
  };
};

export const getTypes = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/types`)
      .then((types) => dispatch({ type: "GET_TYPES", payload: types.data }))
      .catch((e) => console.log(e));
  };
};
