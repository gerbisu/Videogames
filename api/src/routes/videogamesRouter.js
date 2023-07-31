const { Router } = require('express');
const videogamesRouter = Router()


videogamesRouter.get("/", (req, res) => {
    try{
        res.status(200).send("Se ejecuto todo correctamente y aca estan los videojuegos []")
    } catch(error){
        res.status(400)
    }
})

videogamesRouter.get("/:idVideogame", (req, res) => {
    try{
        res.status(200).send("Se ejecuto todo correctamente y aca esta el videojuego por ID []")
    } catch(error){
        res.status(400)
    }
})
//
module.exports = videogamesRouter