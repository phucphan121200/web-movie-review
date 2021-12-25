import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import movie from './movieReducer'
import rating from './ratingReducer'
import genre from './genreReducer'

export default combineReducers({
    auth,
    token,
    movie,
    rating,
    genre
})