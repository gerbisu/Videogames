const {
  createVideogameDB,
  VideogameById,
  VideogameByName,
  AllGames,
} = require("../controllers/videogamesControllers.js");

const videogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const videogame = await VideogameByName(name);
      res.status(200).send(videogame);
    } else {
      const videogames = await AllGames();
      res.status(200).send(videogames);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const videogameByIdHandler = async (req, res) => {
  const { id } = req.params;
  let dataLocation;

  if (isNaN(id)) {
    dataLocation = "db";
  } else {
    dataLocation = "api";
  }
  try {
    const videogame = await VideogameById(id, dataLocation);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postVideogameHandler = async (req, res) => {
  const { name, description, platforms, image, released, rating, genre } =
    req.body;
  try {
    if (
      !name ||
      !description ||
      !platforms ||
      !image ||
      !released ||
      !rating ||
      !genre
    )
      throw new Error("Faltan Datos");
    const newVideoGame = await createVideogameDB(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genre
    );
    res.status(200).json(newVideoGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  videogamesHandler,
  videogameByIdHandler,
  postVideogameHandler,
};
