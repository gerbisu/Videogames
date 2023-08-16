import "./detail.style.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearGameDetails } from "../../redux/actions/index";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gameDetails = useSelector((state) => state.Game);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  if (!gameDetails) {
    return <div>Loading...</div>; // Muestra algo mientras se cargan los detalles del juego.
  }

  const isFromDatabase = gameDetails.genre !== undefined;
  const genresName = isFromDatabase
    ? gameDetails.genre
    : gameDetails.genresName;
  const platformsName = isFromDatabase
    ? gameDetails.platforms
    : gameDetails.platformsName;
  const background_image = isFromDatabase
    ? gameDetails.image
    : gameDetails.background_image;
  const { name, description, released, rating } = gameDetails;

  const backgroundStyle = {
    backgroundImage: `url(${background_image})`,
  };

  return (
    <div className="detail" style={backgroundStyle}>
      <div className="detail-inicio">
        <h2 className="detail-title-text">D E T A L L E</h2>
        <Link to={`/home`} onClick={() => dispatch(clearGameDetails())}>
          <button className="detail-button">Inicio</button>
        </Link>
      </div>
      <div className="detail-info">
        <h2 className="detail-subtitle-text-name">{name}</h2>
        <p className="detail-subtitle-text-name">ID: {id}</p>
        <p className="detail-subtitle-text">Plataformas:</p>
        <p className="detail-text">{platformsName}</p>
        <p className="detail-subtitle-text">Descripción: </p>
        <p className="detail-text">{description}</p>
        <p className="detail-subtitle-text">Fecha de lanzamiento: {released}</p>
        <p className="detail-subtitle-text">Rating: {rating}</p>
        <p className="detail-subtitle-text">Géneros: {genresName}</p>
      </div>
    </div>
  );
}

export default Detail;
