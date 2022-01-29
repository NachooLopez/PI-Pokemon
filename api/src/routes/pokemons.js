const { Router } = require("express");
const {
  getApiPokemons,
  getDbPokemons,
  getApiPokemonByName,
  getDbPokemonByName,
  getApiPokemonById,
  getDbPokemonById,
} = require("./functions");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const lowerName = name.toLowerCase();
      const apiPokeByName = await getApiPokemonByName(lowerName);
      if (!apiPokeByName) {
        const dbPokeByName = await getDbPokemonByName(lowerName);
        if (!dbPokeByName) res.json({ error: "Pokemon not found!" });
        else res.json(dbPokeByName);
      } else res.json(apiPokeByName);
    } else {
      const apiPokemons = await getApiPokemons();
      const dbPokemons = await getDbPokemons();
      const allPokes = apiPokemons.concat(dbPokemons);
      if (dbPokemons.length > 0) {
        res.json(allPokes);
      } else res.json(apiPokemons);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const apiPokemon = await getApiPokemonById(idPokemon);
    if (!apiPokemon) {
      const dbPokemon = await getDbPokemonById(idPokemon);
      if (!dbPokemon) res.json({ error: "Pokemon not found!" });
      else res.json(dbPokemon);
    } else res.json(apiPokemon);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  const { name, life, strength } = req.body;
});

module.exports = router;
