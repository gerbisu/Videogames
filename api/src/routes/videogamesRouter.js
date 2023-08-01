const { Router } = require('express');
const videogamesRouter = Router()
const { videogamesHandler, videogameByIdHandler, postVideogameHandler } = require ('../handlers/videogamesHandler')

videogamesRouter.get("/", videogamesHandler)

videogamesRouter.get("/:id", videogameByIdHandler)

videogamesRouter.post("/", postVideogameHandler)

//

module.exports = videogamesRouter