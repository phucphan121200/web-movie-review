import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import List from "../../components/list/List"
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from '../../redux/actions/authAction'
import {fetchMovie, dispatchGetMovie} from '../../redux/actions/movieAction'
import "./home.scss"
import axios from 'axios';

const Home = ({type}) => {
    const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    const firstlogin = localStorage.getItem('firstlogin')
    if(firstlogin){
      const getToken = async () => {
        const res = await axios.post('/users/refresh_token', null)
        console.log(res)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])
  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])
  useEffect(() => {
      const getMovie = () => {
        return fetchMovie("61b42a606bc815236804f9e9").then(res => {
          dispatch(dispatchGetMovie(res))
        })
      }
      getMovie()
  },[dispatch])
    return (
        <div className="home">
            <Navbar/>
            <Featured type={type}/>
            <List/>
            <List/>
            <List/>    
            
        </div>
    )
}

export default Home
