import ACTIONS from './index'
import axios from 'axios'

export const fetchAllGenre = async () => {
    const res = await axios.get("/genres");
    console.log(res)
    return res
}

export const dispatchGetAllGenre = (res) => {
    return {
        type: ACTIONS.GET_ALL_GENRE,
        payload: {
            genre: res.data,
        }
    }
}