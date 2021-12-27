import React, { useReducer, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useHistory } from "react-router-dom";
import "./ProfileScreen.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpaOutlined } from "@material-ui/icons";
import {toast} from 'react-toastify';
import {
    showErrMsg,
    showSuccessMsg,
  } from "../../components/notification/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/authAction";
const ProfileScreen = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const { user, isLogged } = auth;
  const token = useSelector((state) => state.token);
  const [updateData, setUpdateData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    dob: user.dob,
  });

  const dispatch = useDispatch();
  // const userLink = () => {
  //     return <>
  //         <span>{user.email}</span>
  //         </>
  // }
  let date = new Date(user.dob);

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout");
      localStorage.removeItem("firstlogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const changePassClick = () => {
    history.push(`/${user._id}/change-password`);
  };
  const updateProfile = async () => {
    try {
      const res = await axios.put(`/users/update/${user._id}`, updateData, {
        headers: { token: "Bearer " + token },
      });
      if (res.status === 200) {
        toast.success("Updated user profile")
        dispatch(updateUser(res.data))
      }
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
      
    }
  };

  const dataChange = ($event) => {
    setUpdateData({ ...updateData, [$event.target.name]: $event.target.value });
  };
  return (
    <div className="profileScreen">
      <Navbar />
      <div className="containers">
        <div className="formgroup">
          <div className="profileScreen_body">
            <h1>Profile</h1>
            <div className="profileScreen_info">
              <img
                src={user.profilePic}
                // src="https://1.bp.blogspot.com/-m3UYn4_PEms/Xnch6mOTHJI/AAAAAAAAZkE/GuepXW9p7MA6l81zSCnmNaFFhfQASQhowCLcBGAsYHQ/s1600/Cach-Lam-Avatar-Dang-Hot%2B%25281%2529.jpg"
                alt=""
              />
              <div className="profileScreen_details">
                {
                  <>
                    <span>Email : </span>
                    <input
                      type="text"
                      value={user.email}
                      readonly="readonly"
                    ></input>
                  </>
                }

                {
                  <>
                    <span>First Name : </span>
                    <input
                      name="firstname"
                      onChange={(e) => dataChange(e)}
                      type="text"
                      placeholder={user.firstname}
                    />
                  </>
                }

                {
                  <>
                    <span>Last Name : </span>
                    <input
                      name="lastname"
                      onChange={(e) => dataChange(e)}
                      o
                      type="text"
                      placeholder={user.lastname}
                    />
                  </>
                }

                {
                  <>
                    <span>Date of birth :</span>
                    <input
                      name="dob"
                      onChange={(e) => dataChange(e)}
                      type="date"
                      value={`${date.getFullYear()}-${(
                        "0" +
                        (date.getMonth() + 1)
                      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`}
                    ></input>
                  </>
                }

                <div className="profileScreen_plans">
                  {/* <PlansScreen/> */}
                  <>
                    <button
                      className="profileScreen_update"
                      onClick={updateProfile}
                    >
                      Update
                    </button>
                    <button
                      className="profileScreen_changePass"
                      onClick={changePassClick}
                    >
                      Change Pass
                    </button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileScreen;
