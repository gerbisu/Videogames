//El controller es el que hace la interacion con fuentes externas de informacion (Conexion con base de datos)
const axios = require("axios");
const {Videogame} = require("../db")
const {API_KEY,URL_GAMES} = process.env;
const { Op } = require('sequelize');

const filtro = (videogames) => { //Filtro los videogames y elimino la informacion de plataforms y genres que sobra y la resumo
    return videogames.map(elem => {

        const platforms = [elem.platforms, elem.parent_platforms]
        //Esta parte crea un array que contiene dos elementos. El primer elemento es elem.platforms y el segundo es elem.parent_platforms. 
        .flatMap(platform => platform.map(p => p.platform.name))
        /*
        plataform es un array que tiene información sobre una plataforma de un videojuego.
        EJ:
        platforms = [
        {
            platform: {año: 2017, name: "PlayStation 5",}
        },
        {
            platform: {año: 2018, name: "Xbox Series S/X"},
        }
        ]

        Tomo los nombres de cada plataforma y los meto en un solo array 
        ["PlayStation 5","PlayStation 5","Xbox Series S/X","Xbox Series S/X","Xbox Series S/X"] Devo eliminar los duplicados
        */
        .filter((name, index, arr) => arr.indexOf(name) === index);
        //Le paso el name el index y el array en si para poder eliminar los duplicados


        const genres = elem.genres.map(g => g.id);//extraigo el id del genero

        
        return { // retorno objeto donde todos los elementos estan igual pero plataform y genre les modifique la informacion
            id: elem.id,
            name: elem.name,
            description: elem.description,
            platform: platforms,
            image: elem.background_image,
            released: elem.released,
            rating: elem.rating,
            genre: genres,
        };
    });
};

const createVideogameDB = async (name,description,platforms,image,released,rating,genre) => {
    
    return await Videogame.create({name,description,platforms,image,released,rating,genre});

}

const AllGames = async () => {
    const videogamesDB = await Videogame.findAll();

    const apiData = (await axios.get(`${URL_GAMES}?key=${API_KEY}`)).data.results;

    const apiVideogames = filtro(apiData);
    return [...videogamesDB,...apiVideogames]
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

const VideogameByName = async (name) => {
    const dbVideogames = await Videogame.findAll({ //Busqueda en la Base de Dtaos
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        limit: 15//Limite de juegos
      });

      //Busqueda en la API
      const apiData = (await axios.get(`${URL_GAMES}?search=${name}&key=${API_KEY}&pageSize=15`)).data.results;//Peticion
      const apiVideogames = filtro(apiData);//De toda la data saco lo que me interesa
      const filteredApi = apiVideogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()));//me quedo con los que coinciden
      const result = [...dbVideogames, ...filteredApi];//Sumo todo lo que encontre
      if (result.length === 0) {
        return { message: "No se encontraron juegos con ese nombre" };
      }
      return result.slice(0, 15);//max 15 juegos
    };
    
module.exports = {
    createVideogameDB,
    VideogameById,
    VideogameByName,
    AllGames
}