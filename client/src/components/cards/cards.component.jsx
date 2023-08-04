import "./cards.style.css";
import Card from "../card/card.component"

function Cards({allGames}) {

    const gamesList = allGames

    return (
        <div className="Cards-List">
            {gamesList?.map(game => 

            <Card key={game.id} game = {game}/>)}
            
        </div>
    );
}

export default Cards;