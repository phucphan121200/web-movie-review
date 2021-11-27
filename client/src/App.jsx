import "./app.scss";
import { Routes ,Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import CastDT from "./pages/castDt/CastDt";
import News from "./pages/news/News";
import NewDetail from "./pages/newDetail/NewDetail";
import Navbar from "./components/navbar/Navbar";
import HomeAdmin from "./pages/admin/adminHome/AdminHome"
import UserManager from "./pages/admin/userManager/UserManager";
import User from "./pages/admin/user/User";
import NewUser from "./pages/admin/newUser/NewUser";
import Casts from "./pages/admin/casts/Casts";
import NewCast from "./pages/admin/newCast/NewCast";
import CastsManager from "./pages/admin/castsManager/CastsManager";



function App () {
  return  (
    <Routes>
       <Route exact path="/" element ={<Home/>}/>
         
      <Route  path="/HomeAdmin" element ={<HomeAdmin/>}/>

      <Route  path="/UserManager" element ={<UserManager/>}/>

      <Route  path="/User/:userId" element ={<User/>}/>

      <Route  path="/NewUser" element ={<NewUser/>}/>      

      <Route  path="/CastManager" element ={<CastsManager/>}/>

      <Route  path="/Casts/:castId" element ={<Casts/>}/>     

      <Route  path="/newCast" element ={<NewCast/>}/>
    </Routes>
  
  )
};


export default App;