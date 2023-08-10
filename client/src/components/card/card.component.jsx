import "./card.style.css";
import { Link } from "react-router-dom";

function Card({ game }) {
  const { name, genre, image, id } = game;
  return (
    <div className="card">
      <div className="card-details">
        <h2 className="text-title">{name}</h2>
        <p className="text-body">Genero: {genre}</p>

        <img className="card-image" src={image} alt={name} />

        <Link to={`/detail/${id}`}>
          <button className="card-button">Detalles</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
