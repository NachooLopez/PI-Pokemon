import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  ORDER_BY_ALPHABET,
  ORDER_BY_STRENGTH,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  LOADING,
  CLEAR_DETAILS,
} from "../types";

const initialState = {
  pokemons: [],
  allPokes: [],
  types: [],
  details: {},
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokes: action.payload,
        loading: false,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: action.payload,
        loading: false,
      };

    case GET_POKEMON_BY_ID:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };

    case ORDER_BY_ALPHABET:
      const pokemonsAlphabet =
        action.payload === "all"
          ? state.allPokes
          : action.payload === "a-z"
          ? state.pokemons.slice().sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.pokemons.slice().sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: pokemonsAlphabet,
      };

    case ORDER_BY_STRENGTH:
      const pokemonsStrength =
        action.payload === "all"
          ? state.allPokes
          : action.payload === "attackAsc"
          ? state.pokemons.slice().sort((a, b) => a.attack - b.attack)
          : state.pokemons.slice().sort((a, b) => b.attack - a.attack);
      return {
        ...state,
        pokemons: pokemonsStrength,
      };

    case FILTER_BY_TYPE:
      const pokemonsType =
        action.payload === "all"
          ? state.allPokes
          : state.allPokes.filter((e) =>
              e.types.some((e) => e === action.payload)
            );
      return {
        ...state,
        pokemons: pokemonsType,
      };

    case FILTER_BY_ORIGIN:
      const pokemonsOrigin =
        action.payload === "all"
          ? state.allPokes
          : action.payload === "api"
          ? state.allPokes.filter((e) => !e.created)
          : state.allPokes.filter((e) => e.created);
      return {
        ...state,
        pokemons: pokemonsOrigin,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
