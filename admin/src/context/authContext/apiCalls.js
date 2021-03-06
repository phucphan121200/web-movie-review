import axios from "axios";
import { loginFailure, loginStart, loginSuccess ,logout} from "./AuthAction";

export const login = async (user, dispatch,setNotify) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("users/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
    setNotify({
      isOpen: true,
      message: "Login Successfully",
      type: "success",
    });
  } catch (err) {
    setNotify({
      isOpen: true,
      message: "Login Failed: " + err ,
      type: "error",
    });
    dispatch(loginFailure());
  }
};


export const lout = async ( dispatch,setNotify) => {
  setNotify({
    isOpen: true,
    message: "Logout Successfully" ,
    type: "success",
  });
    dispatch(logout());
    
};