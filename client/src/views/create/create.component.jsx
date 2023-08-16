import "./create.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { validation } from "../../utils/validation";
import { getAllGenres, getAllGames } from "../../redux/actions/index";
import { Link } from "react-router-dom";

function Create() {
  const dispatch = useDispatch();
  //-------Carga de Games--------
  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);
  //-------Estados Globales---
  const allGamescopy = useSelector((state) => state.allGamescopy);
  const allGenres = useSelector((state) => state.allGenres);
  //-----Estados Locales----
  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "",
    rating: "",
    genre: [],
  });
  const [errors, setErrors] = useState({
    name: "inserte nombre",
    description: "descripcion...",
    platforms: "plataforma...",
    image: "url...",
    released: "DD/MM/AA...",
    rating: "Seleccione Rating",
    genre: "Seleccione Genero",
  });
  //-----Funciones-----
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      let updatedGenres = [...input.genre]; //copia del estado input
      if (checked) {
        updatedGenres.push(value); // si es checked agrego genero
      } else {
        updatedGenres = updatedGenres.filter((genre) => genre !== value); // si es checked filtro genero
      }

      setInput({ ...input, genre: updatedGenres });
      validate({ ...input, genre: updatedGenres });
    } else {
      setInput({ ...input, [name]: value });
      validate({ ...input, [name]: value });
    }
  }

  const validate = (input) => {
    const errors = validation(input);
    setErrors(errors);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (allGamescopy.some((game) => game.name === input.name)) {
      alert("Nombre Repetido");
    } else {
      axios
        .post("http://localhost:3001/videogames", input)
        .then((res) => {
          alert(res);
          setInput({
            name: "",
            description: "",
            platforms: "",
            image: "",
            released: "",
            rating: "",
            genre: "",
          });
          setErrors({
            name: "inserte nombre",
            description: "descripcion...",
            platforms: "plataforma...",
            image: "url...",
            released: "DD/MM/AA...",
            rating: "Seleccione Raiting",
            genre: "Seleccione Genero",
          });
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="create">
      <div className="create-inicio">
        <h2 className="create-title-text">C R E A C I O N</h2>
        <Link to={`/home`}>
          <button>Inicio</button>
        </Link>
      </div>
      <form onSubmit={handlerSubmit} className="create-form">
        <div>
          <label className="create-lable">Nombre</label>
          <input
            name="name"
            value={input.name}
            onChange={handleChange}
            className="create-input"
          />
          {errors.name && <span className="create-error">{errors.name}</span>}
        </div>
        <div>
          <label className="create-lable">Imagen</label>
          <input
            name="image"
            value={input.image}
            onChange={handleChange}
            className="create-input"
          />
          {errors.image && <span className="create-error">{errors.image}</span>}
        </div>
        <div>
          <label className="create-lable">Descripción</label>
          <input
            className="create-input"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="create-error">{errors.description}</span>
          )}
        </div>
        <div>
          <label className="create-lable">Plataformas</label>
          <input
            className="create-input"
            name="platforms"
            value={input.platforms}
            onChange={handleChange}
          />
          {errors.platforms && (
            <span className="create-error">{errors.platforms}</span>
          )}
        </div>
        <div>
          <label className="create-lable">Fecha de lanzamiento</label>
          <input
            className="create-input"
            name="released"
            value={input.released}
            onChange={handleChange}
          />
          {errors.released && (
            <span className="create-error">{errors.released}</span>
          )}
        </div>
        <div>
          <label className="create-lable">Rating</label>
          <select name="rating" value={input.rating} onChange={handleChange}>
            <option value="">Seleccionar Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.rating && (
            <span className="create-error">{errors.rating}</span>
          )}
        </div>
        {allGenres && allGenres.newGenre && allGenres.newGenre.length > 0 && (
          <div>
            <label className="create-lable">Géneros</label>
            <div>
              {allGenres.newGenre.map((genre) => (
                <label key={genre} className="create-check">
                  <input
                    type="checkbox"
                    name="genre"
                    value={genre}
                    checked={input.genre.includes(genre)}
                    onChange={handleChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
            {errors.genre && (
              <span className="create-error">{errors.genre}</span>
            )}
          </div>
        )}
        {/*del objeto errors saco solo las propiedades y los pongo en array luego por cada uno verifico si existe error*/}
        {Object.values(errors).every((error) => !error) && (
          <button type="submit">Crear</button>
        )}
      </form>
    </div>
  );
}

export default Create;
