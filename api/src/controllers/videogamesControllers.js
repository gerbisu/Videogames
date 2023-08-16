//El controller es el que hace la interacion con fuentes externas de informacion (Conexion con base de datos)
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY, URL_GAMES } = process.env;
const { Op } = require("sequelize");

const filtro = (videogames) => {
  return videogames.map((game) => {
    const platforms =
      game.platforms &&
      game.platforms.map((platform) => platform.platform.name).join(", ");
    const genres =
      game.genres && game.genres.map((genre) => genre.name).join(", ");

    return {
      id: game.id,
      name: game.name,
      description: game.description,
      platform: platforms,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genre: genres,
    };
  });
};

const createVideogameDB = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genre
) => {
  const newVideogame = await Videogame.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genre,
    origin: "Data Base",
  });
  return newVideogame;
};

const AllGames = async () => {
  const videogamesDB = await Videogame.findAll();
  let apiVideogames = [];
  for (let i = 1; i <= 5; i++) {
    const apiData = (await axios.get(`${URL_GAMES}?key=${API_KEY}&page=${i}`))
      .data.results;
    apiData.map((game) => {
      apiVideogames.push(game);
    });
  }
  apiVideogames = filtro(apiVideogames);
  return [...videogamesDB, ...apiVideogames];
};

const VideogameById = async (id, dataLocation) => {
  let videogameById;

  if (dataLocation === "api") {
    //Reviso donde buscar el videogame
    const response = await axios.get(`${URL_GAMES}/${id}?key=${API_KEY}`);
    const {
      id: apiId,
      name,
      description,
      released,
      platforms,
      background_image,
      rating,
      genres,
    } = response.data;
    const platformsName = platforms.map((data) => data.platform.name);
    const genresName = genres.map((data) => data.name).join(", ");
    videogameById = {
      id,
      name,
      description,
      released,
      platformsName,
      background_image,
      rating,
      genresName,
    };
  } else {
    videogameById = await Videogame.findByPk(id);
  }
  return videogameById;
};

const VideogameByName = async (name) => {
  const cleanName = name.trim().toLowerCase();

  const dbVideogames = await Videogame.findAll({
    //Busqueda en la Base de Dtaos
    where: {
      name: {
        [Op.iLike]: `%${cleanName}%`,
      },
    },
    limit: 15, //Limite de juegos
  });

  //Busqueda en la API
  const apiData = (
    await axios.get(
      `${URL_GAMES}?search=${cleanName}&key=${API_KEY}&pageSize=15`
    )
  ).data.results; //Peticion

  const apiVideogames = filtro(apiData); //De toda la data saco lo que me interesa

  const filteredApi = apiVideogames.filter((game) =>
    game.name.toLowerCase().includes(cleanName)
  ); //me quedo con los que coinciden

  const result = [...dbVideogames, ...filteredApi]; //Sumo todo lo que encontre
  if (result.length === 0) {
    return { message: "No se encontraron juegos con ese nombre" };
  }
  return result.slice(0, 15); //max 15 juegos
};

module.exports = {
  createVideogameDB,
  VideogameById,
  VideogameByName,
  AllGames,
};
