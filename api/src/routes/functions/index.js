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
          const types = e.types.map((e) => e.type.name);
          const name = e.name[0].toUpperCase() + e.name.slice(1);
          return {
            id: e.id,
            name,
            image: e.sprites.other.home.front_default,
            types,
            attack: e.stats[1].base_stat,
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
          through: {
            attributes: [],
          },
        },
        attributes: ["id", "name", "image", "attack", "created"],
      });
      return pokemons.map((e) => ({
        id: e.id,
        name: e.name,
        image: e.image,
        attack: e.attack,
        types: e.types.map((e) => e.name),
        created: e.created,
      }));
    } catch (e) {
      console.log(e);
    }
  },
  getApiPokemonByName: async (name) => {
    try {
      const foundPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemon = foundPokemon.data;
      const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      const types = pokemon.types.map(
        (e) => e.type.name[0].toUpperCase() + e.type.name.slice(1)
      );
      return [
        {
          id: pokemon.id,
          name: pokeName,
          image: pokemon.sprites.other.home.front_default,
          types,
          attack: pokemon.stats[1].base_stat,
        },
      ];
    } catch (e) {
      console.log(e);
    }
  },
  getDbPokemonByName: async (name) => {
    try {
      const foundPokemon = await Pokemon.findAll({
        where: {
          name,
        },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        attributes: ["id", "name", "attack", "image"],
      });
      return foundPokemon.map((e) => ({
        id: e.id,
        name: e.name,
        image: e.image,
        types: e.types.map((e) => e.name[0].toUpperCase() + e.name.slice(1)),
        attack: e.attack,
      }));
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
      const types = pokemon.types.map((t) => t.type.name);
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
      const foundPokemon = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return {
        id: foundPokemon.id,
        image: foundPokemon.image,
        name: foundPokemon.name,
        types: foundPokemon.types.map((e) => e.name),
        hp: foundPokemon.hp,
        attack: foundPokemon.attack,
        defense: foundPokemon.defense,
        speed: foundPokemon.speed,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        created: foundPokemon.created,
      };
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
    weight,
    image
  ) => {
    try {
      if (!image) image = "https://i.imgur.com/G4WCJsE.png";
      const pokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
      });

      const typeDb = await Type.findAll({
        where: {
          name: types,
        },
      });

      pokemon.addType(typeDb);
      console.log(pokemon);
      return pokemon;
    } catch (e) {
      console.log(e);
    }
  },
  deletePokemon: async (id) => {
    Pokemon.destroy({
      where: {
        id,
      },
    });
    return { success: "Pokémon deleted successfully!" };
  },
};
