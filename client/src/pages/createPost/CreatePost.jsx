import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction'
import { fetchAllGenre, dispatchGetAllGenre } from '../../redux/actions/genreAction'
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'
import Create from '../../components/createPost/CreatePost'
import "./createPost.scss"
import BurgerButton from '../../components/burger/burgerButton';

const CreatePost = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        const firstlogin = localStorage.getItem('firstlogin')
        if (firstlogin) {
            const getToken = async () => {
                const res = await axios.post('/users/refresh_token', null)
                console.log(res)
                dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
            }
            getToken()
        }
    }, [auth.isLogged, dispatch])
    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch(dispatchLogin())

                return fetchUser(token).then(res => {
                    dispatch(dispatchGetUser(res))
                })
            }
            getUser()
        }
    }, [token, dispatch])

    useEffect(() => {
        const getAllGenre = () => {
            return fetchAllGenre().then(res => {
                dispatch(dispatchGetAllGenre(res))
            })
        }
        getAllGenre()
    }, [dispatch])
    return (
        <div className='home'>
            <Navbar />
            <Create/>
        </div>
    )
}

export default CreatePost
