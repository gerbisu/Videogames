import "./navbar.style.css";

function Navbar({handleChange, handleSubmit}) {
    return (
        <div className="Navbar">

            <form onChange={handleChange}>

                <input placeholder="Busqueda" type="search"/>
                <button type="submit" onClick={handleSubmit}>Buscar</button>

            </form>
        </div>
    );
}

export default Navbar;