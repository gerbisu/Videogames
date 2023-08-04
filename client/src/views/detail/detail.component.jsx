import "./detail.style.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getById } from "../../redux/actions/index"

function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const gameDetails = useSelector((state) => state.allGamescopy);

    useEffect(() => {
        dispatch(getById(id));
      }, [dispatch, id]);

      
      if (!gameDetails) {
        return <div>Loading...</div>; // Muestra algo mientras se cargan los detalles del juego.
      }
      const { name, genresName, background_image, description, released, rating, platformsName } = gameDetails;
      

    return (
    <div className="container">
      <h1>Nombre: {name}</h1>
      <p>ID: {id}</p>
      <p>Plataformas: {platformsName}</p>
      <p>Descripción: {description}</p>
      <p>Fecha de lanzamiento: {released}</p>
      <p>Rating: {rating}</p>
      <p>Géneros: {genresName}</p>
      <img src={background_image} alt={name}/>

    </div>
    )
}

export default Detail;