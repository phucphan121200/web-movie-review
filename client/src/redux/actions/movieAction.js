import ACTIONS from './index'
import axios from 'axios'

export const fetchMovie = async (id) => {
    const res = await axios.get("/movies/find/" + id);
    return res
}

export const dispatchGetMovie = (res) => {
    return {
        type: ACTIONS.GET_MOVIE,
        payload: {
            movie: res.data,
        }
    }
}

export const fetchRatingMovie = async (id) => {
    const res = await axios.get("/reviews/getallrating/" + id);
    return res
}

export const dispatchGetRatingMovie = (res) => {
    return {
        type: ACTIONS.GET_RATING_MOVIE,
        payload: {
            rating: res.data,
        }
    }
}

export const fetchReviewMovie = async (id) => {
    const res = await axios.get("/reviews/find/" + id);
    console.log(res)
    return res
}

export const dispatchGetReviewMovie = (res) => {
    return {
        type: ACTIONS.GET_REVIEW_MOVIE,
        payload: {
            review: res.data,
        }
    }
}

