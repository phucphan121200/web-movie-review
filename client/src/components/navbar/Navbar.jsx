import { ArrowDropDown, LibraryAdd, Notifications, Search } from "@material-ui/icons"
import { useState } from "react"
import "./navbar.scss"
import React from "react";
import { useHistory } from "react-router"
import {
    Link
} from "react-router-dom";
import { useSelector } from 'react-redux'
import Searchbar from "../Searchbar/Searchbar";
import axios from "axios";

const Navbar = () => {
    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth
    console.log(useSelector(state => state.token))
    const userLink = () => {
        return <>
            <span>{user.firstname} {user.lastname}</span>
            <Notifications className="icon" />
            <img src={user.profilePic}
                alt="" />
            <div className="profile">
                <ArrowDropDown className="icon" />
                <div className="options">
                <span><Link className="link" to ="/profile">Settings</Link></span>
                    <span onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </>
    }
    const handleLogout = async () => {
        try {
            await axios.get('/users/logout')
            localStorage.removeItem('firstlogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }
    const [isScolled, setIsScrolled] = useState(false);
    const History = useHistory()
    // const redirect = (page) => {
    //     History.push(`${page}`)
    // }
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScolled ? "navbar scrolled" : "navbar"}>
            <div className="container">

                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <span><Link className="link" to="/">Home</Link></span>
                    <span><Link className="link" to="/series">Series</Link></span>
                    <span><Link className="link" to="/movies">Movies</Link></span>
                    <span><Link className="link" to="/news">New and Popular</Link></span>
                    <span>Celebrity</span>
                    {isLogged && <span> <Link to="/watch-list" className="link">Watch List</Link></span>}
                </div>
                <div className="right">
                    <Searchbar />
                    {
                        isLogged
                        ? userLink()
                        : <><button className="loginButton"><Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Sign In</Link></button>
                        <button className="signupButton"><Link style={{ textDecoration: 'none', color: 'red' }} to="/register">Sign up</Link></button></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar