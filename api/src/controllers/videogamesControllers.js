//El controller es el que hace la interacion con fuentes externas de informacion (Conexion con base de datos)
const axios = require("axios");
const {Videogame} = require("../db")
const {API_KEY,URL_GENRES} = process.env;

const createVideogameDB = async (name,description,platforms,image,released,rating,genre) => {
    
    return await Videogame.create({name,description,platforms,image,released,rating,genre});

}

const AllGames = async () => {
    
}

const VideogameById = async () => {

}

const VideogameByName = async () => {
    
}

module.exports = {
    createVideogameDB,
    VideogameById,
    VideogameByName,
    AllGames
}