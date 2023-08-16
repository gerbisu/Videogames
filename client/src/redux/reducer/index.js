import {
  GET_GAMES,
  GET_BY_NAME,
  GET_BY_ID,
  SORTED,
  RATING,
  GET_GENRES,
  GENRES,
  RESETED,
  ORIGIN,
  CLEAR_GAME_DETAILS,
} from "../actions/index";

let initialState = {
  allGames: [],
  allGamescopy: [],
  allGenres: [],
  Game: [],
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allGamescopy: action.payload,
        filtered: action.payload,
        sorted: action.payload,
        error: null,
      };
    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allGamescopy: action.payload,
        error: null,
      };
    case GET_BY_ID:
      return {
        ...state,
        Game: action.payload,
      };
    case CLEAR_GAME_DETAILS:
      return {
        ...state,
        Game: action.payload,
      };
    case RATING:
    case SORTED:
    case GENRES:
    case RESETED:
    case ORIGIN:
      return {
        ...state,
        allGamescopy: action.payload,
        error: null,
      };
    default:
      return state;
  }
}

export default rootReducer;
