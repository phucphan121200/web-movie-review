import "./resetPassword.scss";
import React, { useEffect, useState } from "react";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../components/notification/Notification";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const initialState = {
  password: "",
  confirmPassword: "",
  err: "",
  success: "",
};
export default function Resetpassword() {
  const [data, setData] = useState(initialState);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  console.log(user);
  const params = useParams();
  useEffect(() => {
    if(params.userId != user._id){
      history.push("/");
    }
  },[user])
  const { token } = useParams();
  //console.log(token)

  const { password, confirmPassword, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    try {
      const res = await axios.post(
        "/users/reset",
        { password, confirmPassword },
        {
          headers: { token: "Bearer " + token },
        }
      );
      console.log(res);
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const gotoHome = () => {
    history.push("/")
  }
  return (
    <div className="resetPass">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/netflix-59bfe.appspot.com/o/images%2FLogo.png?alt=media&token=22276c2d-a3db-410e-a480-e1602b74d20b"
            alt=""
            onClick={gotoHome}
          />
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>
      </div>
      <div className="container">
        <form>
          <h1>New Password</h1>
          <span>New Password</span>
          <input
            type="password"
            placeholder="Enter new password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
          <span>Confirm New Password</span>
          <input
            type="password"
            placeholder="Password"
            id="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChangeInput}
          />
          <button
            className="resetPassButton"
            type="button"
            onClick={handleResetPass}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
