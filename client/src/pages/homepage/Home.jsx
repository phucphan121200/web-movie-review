import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import List from "../../components/list/List"
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from '../../redux/actions/authAction'
import {fetchMovie, dispatchGetMovie} from '../../redux/actions/movieAction'
import "./home.scss"
import axios from 'axios';
import BurgerButton from "../../components/burger/burgerButton";

const Home = ({type}) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
  useEffect(() =>{
    const getRamdomLists = async ()=>{
        try{
            const res = await axios.get(
                `lists${type ? "?type=" + type : ""}${
                  genre ? "&genre=" + genre : ""}`
            );
             setLists(res.data);
        }catch(err)
        {
            console.log(err);
        }
    };
    getRamdomLists();
}, [type, genre]);
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
        return fetchMovie("6196757511a521225c2849c9").then(res => {
          dispatch(dispatchGetMovie(res))
        })
      }
      getMovie()
  },[dispatch])
    return (
        <div className="home">
            <Navbar/>
            <Featured type={type}/>
            {lists.map((list)=>(
                <List list={list} key={list._id} />
            ))}
            {
              auth.isLogged ?
              <BurgerButton/> :<></>
            }  
        </div>
    )
}

export default Home
