const { Router } = require('express');
const pokemonRoutes = require("./pokemons")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/pokemons', pokemonRoutes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
