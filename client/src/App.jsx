import "./app.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/homepage/Home";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import CastDT from "./pages/castDt/CastDt";
import News from "./pages/news/News";
import NewDetail from "./pages/newDetail/NewDetail";
import Navbar from "./components/navbar/Navbar";
import Email from "./pages/email/email";
import Resetpassword from "./pages/resetPassword/resetPassword";
import { useSelector } from "react-redux";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from "./pages/changePassword/changePassword";
function App() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login" component={isLogged ? Home : Login} exact />
        <Route path="/register">
          {!isLogged ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/forgot_password">
          <Email />
        </Route>
        <Route exact path="/users/activation/:tokenActivation">
          <Login />
        </Route>
        <Route exact path="/users/reset/:token">
          <Resetpassword />
        </Route>
        <Route path="/watch">
          <Watch></Watch>
        </Route>
        <Route path="/movies/:id">
          <MovieDetail></MovieDetail>
        </Route>
        {isLogged && (
          <>
            <Route path="/movies">
              <Home type="movies" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/profile" exact>
              <ProfileScreen />
            </Route>
            <Route path="/profile/:userId/change-password">
              <ChangePassword></ChangePassword>
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
            <Route path="/news">
              <News />
            </Route>
          </>
        )}
      </Switch>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
