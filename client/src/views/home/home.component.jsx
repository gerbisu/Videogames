import "./home.style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllGames,
  getByName,
  sortedVideogames, //!Ordena por nombre
  raitingVideogames, //!Ordena pro raiting
  genresVideogames, //!Filtra por genero
  getGamesOrigin, //!Filtra por origen
  getAllGenres,
  reseted,
} from "../../redux/actions/index";
import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import Paginacion from "../../components/paginacion/paginacion.component";

function Home() {
  const dispatch = useDispatch();
  //-------Carga de Games--------
  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  const allGamescopy = useSelector((state) => state.allGamescopy);
  const allGenres = useSelector((state) => state.allGenres);
  const error = useSelector((state) => state.error);

  //----Estados Locales-----
  const [selectedGenre, setSelectedGenre] = useState("Todos"); // Genero selected
  const [selectedOrigin, setSelectedOrigin] = useState("Todos"); // Origin selected
  const [selectedSorting, setSelectedSorting] = useState(""); // Ordenamiento selected
  const [pagina, setPagina] = useState(1); //N° pagina
  const [porPagina, setPorPagina] = useState(15); //N°cards por pag
  const [searchString, setSearchString] = useState(""); //String del nombre del game buscado
  const maximo = allGamescopy.length / porPagina; //Maximo de paginas

  //------Busqueda por nombre----
  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(searchString));
  }
  //-------Filtro por Genero-----
  function handleGenre(event) {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
    if (selectedGenre === "Todos") {
      dispatch(reseted());
    } else {
      dispatch(genresVideogames(selectedGenre));
    }
  }
  //-------Filtro por Origen---
  function handleOrigin(event) {
    const selectedOrigin = event.target.value;
    setSelectedOrigin(selectedOrigin);
    if (selectedGenre === "Todos") {
      dispatch(reseted());
    } else {
      dispatch(getGamesOrigin(selectedOrigin));
    }
  }
  //------Ordenamiento------
  function handleSorting(event) {
    const selectedSorting = event.target.value;
    setSelectedSorting(selectedSorting);

    if (selectedSorting === "ratingAsc") {
      dispatch(raitingVideogames(false));
    } else if (selectedSorting === "ratingDesc") {
      dispatch(raitingVideogames(true));
    } else if (selectedSorting === "nameAsc") {
      dispatch(sortedVideogames(true));
    } else if (selectedSorting === "nameDesc") {
      dispatch(sortedVideogames(false));
    }
  }
  //-------Reseteo----------
  function handleReset(event) {
    dispatch(reseted());
    setSelectedGenre("Todos");
    setSelectedOrigin("Todos");
    setSelectedSorting("");
  }

  return (
    <div className="home">
      <h2 className="home-title-text">I N I C I O</h2>
      <Link to={`/create`}>
        <button>Crear</button>
      </Link>

      <select id="opciones" onChange={handleGenre}>
        <option value="Todos">Todos</option>
        {allGenres.newGenre &&
          allGenres.newGenre.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
      </select>

      <select id="opciones" onChange={handleOrigin}>
        <option value="Todos">Todos</option>
        <option value="API">Existentes</option>
        <option value="Database">Creados</option>
      </select>

      <Navbar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSorting={handleSorting}
        handleReset={handleReset}
      />

      {/* Mostrar las Cards solo si no hay mensaje de error */}
      {error && error.message && (
        <div className="error-message">{error.message}</div>
      )}

      {!error || !error.message ? (
        <Cards
          selectedGenre={selectedGenre}
          selectedOrigin={selectedOrigin}
          selectedSorting={selectedSorting}
          allGamescopy={allGamescopy}
          pagina={pagina}
          porPagina={porPagina}
        />
      ) : (
        <div className="error-message">{error.message}</div>
      )}
      <Paginacion
        pagina={pagina}
        maximo={maximo}
        setPagina={setPagina}
        setPorPagina={setPorPagina}
      />
    </div>
  );
}

export default Home;
