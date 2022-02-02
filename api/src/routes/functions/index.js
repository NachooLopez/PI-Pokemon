const axios = require("axios");
const { Pokemon, Type } = require("../../db");

module.exports = {
  getTypes: async () => {
    try {
      const types = await axios.get("https://pokeapi.co/api/v2/type");
      const data = types.data.results;

      data.forEach((e) =>
        Type.findOrCreate({
          where: {
            name: e.name,
          },
        })
      );

      const typesFromDb = await Type.findAll();
      return typesFromDb;
    } catch (e) {
      return e;
    }
  },
  getApiPokemons: async () => {
    try {
      const pokemons20 = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      const pokemons40 = await axios.get(pokemons20.data.next);
      const allPokes = pokemons20.data.results.concat(pokemons40.data.results);
      const allUrls = allPokes.map((e) => axios.get(e.url));
      const data = await Promise.all(allUrls).then((e) => {
        const pokemons = e.map((e) => e.data);
        const arr = pokemons.map((e) => {
          return {
            id: e.id,
            name: e.name,
            image: e.sprites.other.home.front_default,
            types: e.types.map((e) => e.type.name),
            hp: e.stats[0].base_stat,
            attack: e.stats[1].base_stat,
            defense: e.stats[2].base_stat,
            speed: e.stats[5].base_stat,
            height: e.height,
            weight: e.weight,
          };
        });
        return arr;
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  getDbPokemons: async () => {
    try {
      const pokemons = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["id", "name"],
        },
        attributes: [
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "speed",
          "height",
          "weight",
        ],
      });
      return pokemons;
    } catch (e) {
      console.log(e);
    }
  },
  getApiPokemonByName: async (name) => {
    try {
      const foundPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      return foundPokemon.data;
    } catch (e) {
      console.log(e);
    }
  },
  getDbPokemonByName: async (name) => {
    try {
      const foundPokemon = await Pokemon.findOne({
        where: {
          name,
        },
      });
      return foundPokemon;
    } catch (e) {
      console.log(e);
    }
  },
  getApiPokemonById: async (id) => {
    try {
      const foundPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return foundPokemon.data;
    } catch (e) {
      console.log(e);
    }
  },
  getDbPokemonById: async (id) => {
    try {
      const foundPokemon = await Pokemon.findOne({ where: { id } });
      return foundPokemon;
    } catch (e) {
      console.log(e);
    }
  },
};
