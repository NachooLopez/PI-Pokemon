const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemons = require("./pokemons");
const types = require("./types.js");

const app = express();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

app.use(express.json());
app.use("/pokemons", pokemons);
app.use("/types", types);

module.exports = app;
