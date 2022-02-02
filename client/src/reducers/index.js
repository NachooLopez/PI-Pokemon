const initialState = {
  pokemons: [],
  types: [],
  details: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
