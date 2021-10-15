const { Router } = require('express');
const pokemonRoutes = require("./pokemons")
const tiposRoutes = require('./types')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/pokemons', pokemonRoutes)
router.use('/type',tiposRoutes)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
