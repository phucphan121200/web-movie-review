import ACTIONS from '../actions/'

const initialState = {
    genre: []
}

const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_GENRE:
            return {
                ...state,
                genre: action.payload.genre,
            }
        default:
            return state
    }
}

export default movieReducer