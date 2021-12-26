import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction'
import { fetchAllGenre, dispatchGetAllGenre } from '../../redux/actions/genreAction'
import axios from 'axios';
import General from "../../components/general/General"
import Navbar from '../../components/navbar/Navbar'
import MenuPost from '../../components/menuPost/MenuPost';
import "./profile.scss"

const Profile = () => {
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
        <div className='profile-page'>
            <Navbar/>
            <div className='sort'>
                <div className="sort-general">
                    <General />
                </div>
                <div className="sort-menu">
                    <MenuPost />
                </div>
            </div>
        </div>
    )
}

export default Profile
