import {GET_GAMES, GET_BY_NAME, GET_BY_ID} from "../actions/index"

let initialState = {
    allGames: [],
    allGamescopy: []
}

function rootReducer(state = initialState,action){
    switch(action.type){
        case GET_GAMES:
            return{
                ...state,
                allGames:action.payload,
                allGamescopy:action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                allGames:action.payload,
                allGamescopy:action.payload
            }
        case GET_BY_ID:
            return {
                ...state,
                allGames:action.payload,
                allGamescopy: action.payload,
            }
            
        default:
            return state
    }
}

export default rootReducer