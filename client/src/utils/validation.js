export function validation(input) {
    let errors = {};
  
    if (!input.name) {
      errors = { ...errors, name: "Falta nombre del videojuego" };
    } else {
      errors = { ...errors, name: "" };
    }
  
    if (!input.description) {
      errors = { ...errors, description: "Falta descripcion del videojuego" };
    } else {
      errors = { ...errors, description: "" };
    }

    if (!input.genre) {
        errors = { ...errors, genre: "Seleccione un género" };
      } else {
        errors = { ...errors, genre: "" };
      }

    if (!input.platforms) {
        errors = { ...errors, genre: "Falta platforms del videojuego" };
      } else {
        errors = { ...errors, genre: "" };
      }

    if (!input.image) {
        errors = { ...errors, genre: "Falta image del videojuego" };
      } else {
        errors = { ...errors, genre: "" };
      }

    if (!input.released) {
        errors = { ...errors, genre: "Falta released del videojuego" };
      } else {
        errors = { ...errors, genre: "" };
      }

    if (!input.rating) {
        errors = { ...errors, genre: "Falta rating del videojuego" };
      } else {
        errors = { ...errors, genre: "" };
      }

    return errors;
  }