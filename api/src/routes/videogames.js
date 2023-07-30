const { Router } = require('express');
const videogames = Router()


videogames.get("/", (req, res) => {
    try{
        res.status(200).send("Se ejecuto todo correctamente y aca estan los videojuegos []")
    } catch(error){
        res.status(400)
    }
})
//
module.exports = videogames