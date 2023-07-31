const { Router } = require('express');
const videogame = Router()


videogame.get("/", (req, res) => {
    try{
        res.status(200).send("Se ejecuto todo correctamente y aca esta EL videojuego []")
    } catch(error){
        res.status(400)
    }
})
//
module.exports = videogame