import "./card.style.css";
import {Link} from "react-router-dom"

function Card({game}) {

    const {name, genre, image, id} = game
    return (
        
        <div className="card">
            <div class="card-details">
                <h2 class="text-title">{name}</h2>
                <p class="text-body">Genero: {genre}</p>

                <img className="card-image" src={image} alt={name} />

            <Link to={`/detail/${id}`}>

                <button class="card-button" >Detalles</button>

            </Link>

            </div>

        </div>
    );
}

export default Card;