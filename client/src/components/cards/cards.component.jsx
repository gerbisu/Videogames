import "./cards.style.css";
import Card from "../card/card.component";

function Cards({ allGamescopy, pagina, porPagina }) {
  const gamesList = allGamescopy;
  return (
    <div className="Cards-List">
      {gamesList
        .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((game) => (
          <Card key={game.id} game={game} />
        ))}
    </div>
  );
}

export default Cards;
