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

  if (input.genre.length === 0) {
    errors = { ...errors, genre: "Falta un género" };
  } else {
    errors = { ...errors, genre: "" };
  }

  if (!input.platforms) {
    errors = { ...errors, platforms: "Falta platafora del videojuego" };
  } else {
    errors = { ...errors, platforms: "" };
  }

  if (!input.image) {
    errors = { ...errors, image: "Falta image del videojuego" };
  } else {
    errors = { ...errors, image: "" };
  }

  if (!input.released) {
    errors = { ...errors, released: "Falta versión del videojuego" };
  } else {
    errors = { ...errors, released: "" };
  }

  if (!input.rating) {
    errors = { ...errors, rating: "Falta rating del videojuego" };
  } else {
    errors = { ...errors, rating: "" };
  }

  return errors;
}
