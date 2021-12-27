import ACTIONS from '../actions/'

const initialState = {
    review: ""
}

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_REVIEW_MOVIE:
            return {
                ...state,
                review: action.payload.review,
            }
        default:
            return state
    }
}

export default reviewReducer