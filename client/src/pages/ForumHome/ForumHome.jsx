import Navbar from "../../components/navbar/Navbar"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction'
import axios from 'axios';
import "./forumHome.scss"

const ForumHome = () => {
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
  return (
    <div className="home">
      <Navbar />
    </div>
  )
}

export default ForumHome
