import "./paginacion.style.css";

function Paginacion({ pagina, setPagina, maximo }) {
  const nextPagina = () => {
    if (pagina < maximo) {
      setPagina(pagina + 1);
    }
  };
  const previousPage = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };
  return (
    <div className="paginacion">
      <button
        className="paginacion-button"
        disabled={pagina === 1}
        onClick={previousPage}
      >
        ◀
      </button>

      <p className="paginacion-text">{pagina}</p>

      <button
        className="paginacion-button"
        disabled={pagina === maximo}
        onClick={nextPagina}
      >
        ▶
      </button>
    </div>
  );
}

export default Paginacion;
