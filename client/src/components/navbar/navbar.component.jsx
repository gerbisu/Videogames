import "./navbar.style.css";

function Navbar({ handleChange, handleSubmit, handleReset, handleSorting }) {
  return (
    <div className="navbar">
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSorting} value={"nameAsc"}>
        A - Z
      </button>
      <button onClick={handleSorting} value={"nameDesc"}>
        Z - A
      </button>
      <button onClick={handleSorting} value={"ratingAsc"}>
        Raiting Acendente
      </button>
      <button onClick={handleSorting} value={"ratingDesc"}>
        Raiting Decendente
      </button>
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
