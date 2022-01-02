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

import Dropdown from "../dropdownGenre/DropdownGenre";


const Navbar = () => {
    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth
    console.log(useSelector(state => state.token))
    const history = useHistory();
    const userLink = () => {
        return <>
            <span>{user.firstname} {user.lastname}</span>
            <Notifications className="icon" />
            <img src={user.profilePic}
                alt="" />
            <div className="profile">
                <ArrowDropDown className="icon" />
                <div className="options">
                {/* <span><Link className="link" to ="/setting">Settings</Link></span> */}
                    <span className="link" onClick={handleProfile}>Profile</span>
                    <span className="link" onClick={handleLogout}>Logout</span>
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
    const handleProfile =() =>{
        window.location.href = "/profile"
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
    const [dropdown, setDropdown] = useState(false);
    const onMouseEnter = () =>{
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      };
      const onMouseLeft = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(false);
        }
      };
      const gotoHome = () => {
          history.push("/")
      }
    return (
        <div className={isScolled ? "navbar scrolled" : "navbar"}>
            <div className="container">

                <div className="left">
                    <img className="logoimg"
                        src="https://firebasestorage.googleapis.com/v0/b/netflix-59bfe.appspot.com/o/images%2FLogo.png?alt=media&token=22276c2d-a3db-410e-a480-e1602b74d20b"
                        alt=""
                        onClick={gotoHome}
                    />
                    <span><Link className="link" to="/">Home</Link></span>
                    
                    {/* <span><Link className="link" to="/series">Series</Link></span>
                    <span><Link className="link" to="/movies">Movies</Link></span> */}
                    <span
                     onMouseEnter={onMouseEnter}
                     onMouseLeave ={onMouseLeft}
                     >
                     <p className="iconGenre"  
                    > Genre </p>
                      <Dropdown dropdown={dropdown} setDropdown={setDropdown}/>
                    </span>
                    

                    <span><Link className="link" to="/forum">Forum</Link></span>

                    {/* <span>Celebrity</span> */}
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