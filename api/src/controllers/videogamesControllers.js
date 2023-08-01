//El controller es el que hace la interacion con fuentes externas de informacion (Conexion con base de datos)
const axios = require("axios");
const {Videogame} = require("../db")
const {API_KEY,URL_GAMES} = process.env;

const createVideogameDB = async (name,description,platforms,image,released,rating,genre) => {
    
    return await Videogame.create({name,description,platforms,image,released,rating,genre});

}

const AllGames = async () => {

}

const VideogameById = async (id, dataLocation) => {

    let videogameById;

    if(dataLocation === "api"){//Reviso donde buscar el videogame
        const response = await axios.get(`${URL_GAMES}/${id}?key=${API_KEY}`);//Hago peticion a la API
        const { id: apiId, name, description, released, platforms, background_image, rating, genres } = response.data;//me quedo con los datos que me interesan
        const platformsName = platforms.map(data => data.platform.name);//Me quedo solo con el nombre
        const genresName = genres.map(data => data.name); //Me quedo solo con el nombre
        videogameById = { id, name, description, released, platformsName, background_image, rating, genresName };//Guardo la info
    } else {
        videogameById = await Videogame.findByPk(id);
    }
    return videogameById;
}

const VideogameByName = async () => {

}

module.exports = {
    createVideogameDB,
    VideogameById,
    VideogameByName,
    AllGames
}