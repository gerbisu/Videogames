import "./navbar.style.css";

function Navbar({
  handleChange,
  handleSubmit,
  handleReset,
  handleRatingAscending,
  handleRatingDescending,
  handleSortZ_A,
  handleSortA_Z,
}) {
  return (
    <div className="navbar">
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSortA_Z}>A - Z</button>
      <button onClick={handleSortZ_A}>Z - A</button>
      <button onClick={handleRatingAscending}>Raiting Acendente</button>
      <button onClick={handleRatingDescending}>Raiting Decendente</button>
      <form onChange={handleChange}>
        <input placeholder="Busqueda" type="search" className="navbar-input" />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default Navbar;
