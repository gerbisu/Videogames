import axios from "axios";
export const GET_GAMES = "GET_GAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const GET_GENRES = "GET_GENRES";
export const GENRES = "GENRES";
export const RESETED = "RESETED";
export const ORIGIN = "ORIGIN";
export const CLEAR_GAME_DETAILS = "CLEAR_GAME_DETAILS";

export function getAllGames() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/videogames");
      return dispatch({
        type: GET_GAMES,
        payload: response.data,
      });
    } catch (error) {
      if (error.response) {
        console.error("Error de la API:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      if (error.response) {
        console.error("Error de la API:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_BY_NAME,
        payload: [],
        error: { message: "Hubo un error al obtener los juegos" },
      });
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      if (error.response) {
        console.error("Error de la API:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
}

/*
export const raitingVideogames = (ascending) => {
  return async function (dispatch, getState) {
    const allGames = getState().allGames;
    const sortedByRating = [...allGames].sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);

      return ascending ? ratingA - ratingB : ratingB - ratingA;
    });
    dispatch({
      type: RATING,
      payload: sortedByRating,
    });
  };
};

export const sortedVideogames = (ascending) => {
  return async function (dispatch, getState) {
    const allGames = getState().allGames;
    const sortedByName = [...allGames].sort((a, b) => {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    dispatch({
      type: SORTED,
      payload: sortedByName,
    });
  };
};


export const genresVideogames = (genre) => {
  return async function (dispatch, getState) {
    const allGames = getState().allGames;
    const sortedByGenre = allGames.filter((game) => game.genre.includes(genre));
    dispatch({
      type: GENRES,
      payload: sortedByGenre,
    });
  };
};

export const getGamesOrigin = (origin) => {
  return async function (dispatch, getState) {
    const allGames = getState().allGames;
    let sortedByOrigin;

    if (origin === "API") {
      sortedByOrigin = allGames.filter((game) => !game.origin);
    } else if (origin === "Database") {
      sortedByOrigin = allGames.filter((game) => game.origin);
    } else {
      sortedByOrigin = allGames;
    }
    dispatch({
      type: ORIGIN,
      payload: sortedByOrigin,
    });
  };
};

export const reseted = () => {
  return async function (dispatch, getState) {
    const allGames = getState().allGames;
    dispatch({
      type: RESETED,
      payload: allGames,
    });
  };
};

*/

export const clearGameDetails = () => {
  return {
    type: "CLEAR_GAME_DETAILS",
  };
};
