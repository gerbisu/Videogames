const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require("./videogamesRouter")
const genresRouter = require("./genresRouter")
//importo los Routers

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesRouter)
router.use("/genres", genresRouter)


// aca exporto el router que tiene todas las rutas listas para ver que es lo que pide la request y dependiendo de lo que se pida
//voy a dirijirlo a diferentes routas y ejecutar funciones diferentes
module.exports = router;
