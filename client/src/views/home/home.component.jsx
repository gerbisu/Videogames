import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getByName,
  sortedVideogames,
  raitingVideogames,
  genresVideogames,
  getAllGenres,
  reset,
} from "../../redux/actions/index";
import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import Paginacion from "../../components/paginacion/paginacion.component";
import styles from "./home.style.css";

function Home() {
  const dispatch = useDispatch();
  //-------Carga de Games--------
  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  const allGamescopy = useSelector((state) => state.allGamescopy); // Todos los juegos
  const allGenres = useSelector((state) => state.allGenres); // Todos los genres
  const error = useSelector((state) => state.error);

  //----Estados Locales-----
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
  //------Filtro por Raiting----
  function handleRatingDescending() {
    dispatch(raitingVideogames(true));
  }

  function handleRatingAscending() {
    dispatch(raitingVideogames(false));
  }
  //-------Filtro por Nombre-----
  function handleSortA_Z() {
    dispatch(sortedVideogames(true));
  }

  function handleSortZ_A() {
    dispatch(sortedVideogames(false));
  }
  //-------Filtro por Genero-----
  function handleGenre(event) {
    const selectedGenre = event.target.value;
    if (selectedGenre === "Todos") {
      dispatch(getAllGames());
    } else {
      dispatch(genresVideogames(selectedGenre));
    }
  }
  //-------Reseteo----------
  function handleReset(event) {
    dispatch(reset());
  }

  return (
    <div className="Home">
      <h2 className={styles.HomeTitle}>Este es el HOME</h2>

      <button onClick={handleReset}>Reset</button>

      <button onClick={handleRatingAscending}>Raiting Acendente</button>

      <button onClick={handleRatingDescending}>Raiting Decendente</button>

      <button onClick={handleSortA_Z}>A - Z</button>

      <button onClick={handleSortZ_A}>Z - A</button>

      <select id="opciones" onChange={handleGenre}>
        <option value="Todos">Todos</option>
        {allGenres.newGenre &&
          allGenres.newGenre.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
      </select>

      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

      {/* Mostrar el mensaje de error si existe */}
      {error && error.message && (
        <div className="error-message">{error.message}</div>
      )}

      {/* Mostrar las Cards solo si no hay mensaje de error */}
      {error && error.message && (
        <div className="error-message">{error.message}</div>
      )}

      {!error || !error.message ? (
        <Cards
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
