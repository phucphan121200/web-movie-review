import "./login.scss";
import { showErrMsg, showSuccessMsg } from '../../components/notification/Notification'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import isEmpty from "validator/lib/isEmpty"
import React, { useState, useEffect } from "react";
import { dispatchLogin } from '../../redux/actions/authAction'
import { useHistory, Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: '',
}
export default function Login() {
  //var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()
  const {tokenActivation} = useParams()
  const [erractive, setErr] = useState('')
  const [successactive, setSuccess] = useState('')

useEffect(() => {
    if(tokenActivation){
        const activationEmail = async () => {
            try {
              console.log(tokenActivation)
                const res = await axios.post('/users/activation', {tokenActivation})
                setSuccess(res.data.msg)
            } catch (err) {
                err.response.data.msg && setErr(err.response.data.msg)
            }
        }
        activationEmail()
    }
},[tokenActivation])
  //console.log(tokenActivation)
  const { email, password, err, success } = user

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', { email, password })
      //console.log(res)
      setUser({ ...user, err: '', success: 'Login Successfully' })
      localStorage.setItem('firstlogin', true);
      dispatch(dispatchLogin(res.data));
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }
  const responseGoogle = async (response) => {
    //console.log(response);
    try {
      const res = await axios.post('users/google_login', { tokenId: response.tokenId })
      setUser({ ...user, err: '', success: res.data.msg });
      localStorage.setItem('firstlogin', true);
      dispatch(dispatchLogin(res.data));
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }
  const responseFacebook = async (response) => {
    //console.log(response);
    try {
      const { accessToken, userID } = response
      const res = await axios.post('users/facebook_login', { accessToken, userID })
      setUser({ ...user, err: '', success: res.data.msg });
      localStorage.setItem('firstlogin', true);
      dispatch(dispatchLogin(res.data));
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }
  const gotoHome = () => {
    history.push("/")
  }
  //console.log(user)
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/netflix-59bfe.appspot.com/o/images%2FLogo.png?alt=media&token=22276c2d-a3db-410e-a480-e1602b74d20b"
            alt=""
            onClick={gotoHome}
          />
          {erractive && showErrMsg(erractive)}
          {successactive && showSuccessMsg(successactive)}
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <span>
            Email Address:
          </span>
          <input type="text" placeholder="Enter your email address" id="email" value={email} name="email" onChange={handleChangeInput} />
          <span>
            Password:
          </span>
          <input type="password" placeholder="Enter your password" id="password" value={password} name="password" onChange={handleChangeInput} />
          <button className="loginButton" type="button" onClick={handleSubmit}>Sign In</button>
          <span className="sign-up">
            <Link style={{ textDecoration: 'none' }} className="forgot-btn" to="/forgot_password">Forgot Password?</Link>
          </span>
          <span className="sign-up">
            New to Netflix? <Link style={{ textDecoration: 'none' }} className="signup-btn" to="/register">Sign up now.</Link>
          </span>
          <hr className="line" />
          <div className="social-button" style={{display: 'flex',flexWrap: 'wrap' }}>
            <GoogleLogin
              clientId="582403466790-cdgmfhup29f2hrfi9n2grna2sk15fmr6.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              cookiePolicy={'single_host_origin'}
              
              render={renderProps => (
                
                <button className="btnGoogle" onClick={renderProps.onClick}>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'/>
                   Sign In with Google</button>
              )}
            >
              <i className="fa fa-google-plus" style={{ marginLeft: 
            '5px', color: 'red', fontWeight:'bold' }}/> 
            <span>&nbsp;&nbsp;Sign In with Google</span>
            </GoogleLogin>
            <span>
            <FacebookLogin
              cssClass="btnFacebook"
              appId="891862731473180"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook} 
              icon={<i className="fa fa-facebook" style={{marginLeft:'5px'}}><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' 
              style= {{width: '20px', height: '20px'}}/></i>}
              textButton = "&nbsp;&nbsp;Sign In with Facebook"
              >
            </FacebookLogin>
            </span>
            
          </div>
        </form>
      </div>
    </div>
  );
}