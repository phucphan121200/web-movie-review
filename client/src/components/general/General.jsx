import React, {useEffect, useState} from 'react'
import "./general.scss"
import { useSelector } from 'react-redux'
import axios from 'axios'


const General = () => {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const [countPost, setcountPost] = useState('')
    const [countWish, setcountWish] = useState('')
    useEffect(async () => {
        try {
            const respost = await axios.get('/posts/getallpublishbyuser',{
                headers: {token: "Bearer " + token}
            })
            setcountPost(respost.data.length)
        } catch (err) {
            err.response.data.msg && setcountPost(0)
        }
        try {
            const reswish = await axios.get('/favorites/find',{
                headers: {token: "Bearer " + token}
            })
            setcountWish(reswish.data.favoriteItems.length)
        } catch (err) {
            err.response.data.msg && setcountPost(0)
        }
    }, [token])
    return (
        <div className='body-general'>
            <div className='info'>
                <img className='profile-img' src={auth.user.profilePic} alt="" />
                <div className='name-user'>{auth.user.firstname} {auth.user.lastname}</div>
                <div className='email-user'>{auth.user.email}</div>
                <button className='button-setting'>Setting</button>
                <div className='line'></div>
                <div className='more'>
                    <span className='post'>
                        POSTS
                        <div className='number-post'>{countPost}</div>
                    </span>
                    <span className='favorite'>
                        WISHES
                        <div className='number-wish'>{countWish}</div>
                    </span>
                </div>
            </div>
            
        </div>
    )
}

export default General
