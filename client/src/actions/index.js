import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  ORDER_BY_ALPHABET,
  ORDER_BY_STRENGTH,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  LOADING,
  CLEAR_DETAILS,
} from "../types";

export const loading = () => ({ type: LOADING });
const BACK_URL = "https://nache-poke-back.herokuapp.com";

export const getPokemons = () => (dispatch) => {
  dispatch(loading());
  axios
    .get(`${BACK_URL}/pokemons`)
    .then((pokemons) => {
      dispatch({ type: GET_POKEMONS, payload: pokemons.data });
    })
    .catch((e) => console.log(e));
};

export const findByName = (name) => (dispatch) => {
  dispatch(loading());
  axios
    .get(`${BACK_URL}/pokemons?name=${name}`)
    .then((pokemon) => {
      dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemon.data });
    })
    .catch((e) => console.log(e));
};

export const getById = (id) => (dispatch) => {
  dispatch(loading());
  axios
    .get(`${BACK_URL}/pokemons/${id}`)
    .then((pokemon) => {
      dispatch({ type: GET_POKEMON_BY_ID, payload: pokemon.data });
    })
    .catch((e) => console.log(e));
};

export const getTypes = () => (dispatch) => {
  axios
    .get(`${BACK_URL}/types`)
    .then((types) => dispatch({ type: GET_TYPES, payload: types.data }))
    .catch((e) => console.log(e));
};

export const createPokemon = (payload) => (dispatch) => {
  axios.post(`${BACK_URL}/pokemons`, payload);
};

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

export const orderByAlphabet = (payload) => ({
  type: ORDER_BY_ALPHABET,
  payload,
});

export const orderByStrength = (payload) => ({
  type: ORDER_BY_STRENGTH,
  payload,
});

export const filterByOrigin = (payload) => ({
  type: FILTER_BY_ORIGIN,
  payload,
});

export const filterByType = (payload) => ({
  type: FILTER_BY_TYPE,
  payload,
});

export const deletePokemon = (payload) => (dispatch) => {
  axios.delete(`${BACK_URL}/pokemons/${payload}`);
};
