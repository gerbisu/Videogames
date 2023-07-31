//El controller es el que hace la interacion con fuentes externas de informacion (Conexion con base de datos)
const axios = require("axios");
const {Genre} = require("../db")
const {API_KEY,URL_GENRES} = process.env;

const createGenreDB = async () => {

    await axios.get(`${URL_GENRES}?key=${API_KEY}`).then(async(response)=>{
        const genresAPI = response.data.results; // Guardo los generos de la API
        const newGenres = genresAPI.map((genre) => genre.name);//creo arreglo de nombres de generos

        await Genre.bulkCreate(newGenres);//Guardo en la DB el arreglo de nombres
        console.log("Guarde los generos en la DB", newGenres)
    })

}

module.exports = {
    createGenreDB
}