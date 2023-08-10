//El controller es el que hace la interacion con fuentes externas de informacion (Conexion con base de datos)
const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY, URL_GENRES } = process.env;

const createGenreDB = async () => {
  const response = await axios.get(`${URL_GENRES}?key=${API_KEY}`);
  const genresAPI = response.data.results; // Guardo los generos de la API
  const newGenres = genresAPI.map((genre) => ({ name: genre.name })); //creo arreglo de nombres de generos

  const createdGenres = [];

  for (const genreData of newGenres) {
    const [genre, created] = await Genre.findOrCreate({
      // si encuentra el nombre en la tabla lo almacena y setea el created false
      where: { name: genreData.name }, // entonces si created es false es porque ya estaba en la tabla y no lo tengo que volver a almacenar
    });

    if (created) {
      console.log("Género creado:", genre.name);
    } else {
      console.log("Género ya existente:", genre.name);
    }
    createdGenres.push(genre.name);
  }
  return createdGenres;
};
module.exports = {
  createGenreDB,
};
