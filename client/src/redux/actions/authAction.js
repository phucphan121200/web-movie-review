import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/users/infor', {
        headers: {token: "Bearer " + token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.isAdmin
        }
    }
}
export const updateUser = (newUser) => {
    return {
        type: ACTIONS.UPDATE_USER,
        payload: {
            data: newUser
        }
    }
}