import { useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import "./email.scss";
import { showErrMsg, showSuccessMsg } from '../../components/notification/Notification'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: '',
}

export default function Email() {
  const [data, setData] = useState(initialState)
  const { email, err, success } = data
  const history = useHistory();

  const handleChangeInput = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }
  const forgotPassword = async () => {
    try {
      const res = await axios.post('/users/forgot', { email })
      console.log(res)
      return setData({ ...data, err: '', success: res.data.msg })
    } catch (err) {
      err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }
  const gotoHome = () => {
    history.push("/")
  }
  return (
    <div className="email">
      <div className="top">
        <div className="wrapper">
        
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/netflix-59bfe.appspot.com/o/images%2FLogo.png?alt=media&token=22276c2d-a3db-410e-a480-e1602b74d20b"
            alt=""
            onClick={gotoHome}
          />
          <button className="loginButton"><Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Sign In</Link></button>
        </div>
      </div>
      <div className="container">
        <h1>Forgot password</h1>
        <h2>Enter your email below and submit to change password</h2>
        <div className="input">
          <input type="email" placeholder="Enter your email" id="email" value={email} name="email" onChange={handleChangeInput} />
          <button className="emailButton" onClick={forgotPassword}>
            Re-send email
          </button>
        </div>
      </div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
    </div>
  );
}
