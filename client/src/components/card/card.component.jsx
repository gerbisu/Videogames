import "./card.style.css";
import {Link} from "react-router-dom"

function Card({game}) {

    const {name, genre, image, id} = game
    return (
        <div className="Card-containter">
            <Link to={`/detail/${id}`}>
            <h2>Nombre: {name}</h2>
            <p>Genero: {genre}</p>
            <img src={image} alt={name}/>
            </Link>
        </div>
    );
}

export default Card;