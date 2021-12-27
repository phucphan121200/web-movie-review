import "../resetPassword/resetPassword.scss";
import React, { useEffect, useState } from "react";
import {
    showErrMsg,
    showSuccessMsg,
} from "../../components/notification/Notification";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const initialState = {
    oldPassword: '',
    newPassword: "",
    confirmPassword: "",
    err: "",
    success: "",
};
const ChangePassword = () => {
    const [data, setData] = useState(initialState);
    const user = useSelector((state) => state.auth.user);
    const history = useHistory();
    console.log(user);
    const params = useParams();
    useEffect(() => {
        if (params.userId != user._id) {
            history.push("/");
        }
    }, [user])
    const token = useSelector(state => state.token);
    //console.log(token)

    const { oldPassword, newPassword, confirmPassword, err, success } = data;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    const handleResetPass = async () => {
        try {
            const res = await axios.put(
                "/users/updatePassword",
                { oldPassword, newPassword, confirmPassword },
                { headers: { token: "Bearer " + token } },

            );
            if (res.status === 201) {
                toast.success("Change password successed");
                setData(initialState);
                setTimeout(function () {
                    history.push("/")
                }, 2000);

            }
        } catch (err) {
            err.response.data.msg &&
                toast.error(err.response.data.msg)
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
                    <h1>Change Password</h1>
                    <span>Old Password</span>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        id="oldPassword"
                        value={oldPassword}
                        name="oldPassword"
                        onChange={handleChangeInput}
                    />
                    <span>New Password</span>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        id="newPassword"
                        value={newPassword}
                        name="newPassword"
                        onChange={handleChangeInput}
                    />
                    {newPassword !== confirmPassword && <span style={{ color: 'red' }}>Password not match</span>}
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
export default ChangePassword;