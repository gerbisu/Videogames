import "./cards.style.css";
import Card from "../card/card.component";

function Cards({
  allGamescopy,
  selectedGenre,
  selectedOrigin,
  selectedSorting,
  pagina,
  porPagina,
}) {
  const gamesList = allGamescopy;
  //---Filtros--
  const filteredByGenre =
    selectedGenre === "Todos"
      ? gamesList
      : gamesList.filter((game) => game.genre.includes(selectedGenre));

  const filteredByOrigin =
    selectedOrigin === "Todos"
      ? filteredByGenre
      : filteredByGenre.filter(
          (game) =>
            (selectedOrigin === "API" && !game.origin) || // si selected es API y el juego NO tiene propiedad origin
            (selectedOrigin === "Database" && game.origin) // si selected es DB y el juego TIENE pripiedad origin
        );

  const sortedGames = [...filteredByOrigin];

  //----Ordenamientos----
  if (selectedSorting === "ratingAsc") {
    sortedGames.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (selectedSorting === "ratingDesc") {
    sortedGames.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
  } else if (selectedSorting === "nameAsc") {
    sortedGames.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSorting === "nameDesc") {
    sortedGames.sort((a, b) => b.name.localeCompare(a.name));
  }
  return (
    <div className="Cards-List">
      {sortedGames
        .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((game) => (
          <Card key={game.id} game={game} />
        ))}
    </div>
  );
}

export default Cards;
