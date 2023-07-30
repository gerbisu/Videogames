const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./videogames")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames)


// aca exporto el router que tiene todas las rutas listas para ver que es lo que pide la request y dependiendo de lo que se pida
//voy a dirijirlo a diferentes routas y ejecutar funciones diferentes
module.exports = router;
