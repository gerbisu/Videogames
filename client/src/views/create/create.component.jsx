import "./create.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { validation } from "../../utils/validation";
import { getAllGenres } from "../../redux/actions/index";
import { Link } from "react-router-dom";

function Create() {
  const dispatch = useDispatch();
  //-------Carga de Games--------
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);
  //-------Estados Globales---
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
    console.log(checked);

    if (type === "checkbox") {
      let updatedGenres = [...input.genre];
      if (checked) {
        updatedGenres.push(value);
      } else {
        updatedGenres = updatedGenres.filter((genre) => genre !== value);
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
  };

  return (
    <div>
      <Link to={`/home`}>
        <button>Inicio</button>
      </Link>
      <form onSubmit={handlerSubmit}>
        <div>
          <label>Nombre</label>
          <input name="name" value={input.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Imagen</label>
          <input name="image" value={input.image} onChange={handleChange} />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <div>
          <label>Descripción</label>
          <input
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div>
          <label>Plataformas</label>
          <input
            name="platforms"
            value={input.platforms}
            onChange={handleChange}
          />
          {errors.platforms && <span>{errors.platforms}</span>}
        </div>
        <div>
          <label>Fecha de lanzamiento</label>
          <input
            name="released"
            value={input.released}
            onChange={handleChange}
          />
          {errors.released && <span>{errors.released}</span>}
        </div>
        <div>
          <label>Rating</label>
          <select name="rating" value={input.rating} onChange={handleChange}>
            <option value="">Seleccionar Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.rating && <span>{errors.rating}</span>}
        </div>
        {allGenres && allGenres.newGenre && allGenres.newGenre.length > 0 && (
          <div>
            <label>Géneros</label>
            <div>
              {allGenres.newGenre.map((genre) => (
                <label key={genre}>
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
            {errors.genre && <span>{errors.genre}</span>}
          </div>
        )}

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default Create;
