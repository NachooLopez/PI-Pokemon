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
          const types = e.types.map(
            (e) => e.type.name[0].toUpperCase() + e.type.name.slice(1)
          );
          const name = e.name[0].toUpperCase() + e.name.slice(1);
          return {
            id: e.id,
            name,
            image: e.sprites.other.home.front_default,
            types,
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
          "type",
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
        attributes: [
          "id",
          "name",
          "hp",
          "attack",
          "defense",
          "speed",
          "height",
          "weight",
          "image",
          "type",
        ],
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
      const pokemon = foundPokemon.data;
      const types = pokemon.types.map(
        (t) => t.type.name[0].toUpperCase() + t.type.name.slice(1)
      );
      const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      return {
        id: pokemon.id,
        image: pokemon.sprites.other.home.front_default,
        name,
        types,
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
      };
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
  createPokemon: async (
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    height,
    weight
  ) => {
    try {
      const pokemon = await Pokemon.create({
        name,
        types,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      });

      const typeDb = await Type.findAll({ where: { name: types } });

      pokemon.addType(typeDb);

      return pokemon;
    } catch (e) {
      console.log(e);
    }
  },
};
