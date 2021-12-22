"use strict";

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//const { updateUser } = require("../services/userService");
const userService = require("../services/userService");
const activationToken = require("../middlewares/activationToken");
const refreshToken = require("../middlewares/refreshToken");
const accessToken = require("../middlewares/accessToken");
const sendEmail = require("../utils/sendMail");
const validateEmail = require("../utils/validation");
const { google } = require('googleapis');
const { OAuth2 } = google.auth
const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)
const { CLIENT_URL } = process.env

//REGISTER
exports.registration = async (req, res) => {

  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    dob: req.body.dob,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  }
  try {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.dob || !req.body.password) {
      res
        .status(401)
        .send({ success: false, msg: "Please fillup required field." });
    } else if (req.body.password.length < 6) {
      return res.status(401).send({
        success: false,
        msg: "Password must be at least 6 characters.",
      });
    } else if (!validateEmail(req.body.email)) {
      res.status(400).json({ success: false, msg: "Invalid email!" })
    } else {
      const userExists = await userService.checkEmailExist(req.body.email);
      if (userExists) {
        return res
          .status(400)
          .send({ success: false, msg: "Email already exists" });
      }
      else {
        //const user = await userService.registration(newUser);
        //const user = await newUser.save();
        //res.status(201).json(user);
        const tokenActivation = await activationToken(newUser);
        console.log(tokenActivation);

        const url = `${CLIENT_URL}/users/activation/${tokenActivation}`;
        sendEmail(req.body.email, req.body.firstname, req.body.lastname, url, "Verify your Email")
        res.status(201).json({ success: true, msg: "Your email has been sent. Please check your email" });
      }
    }
  } catch (err) {
    res.status(500).json({ success: true, msg: err });
  }
}
//ACTIVE EMAIL
exports.activeEmail = async (req, res) => {
  try {
    const { tokenActivation } = req.body
    const user = jwt.verify(tokenActivation, process.env.ACTIVATION_TOKEN_ACTION);
    console.log(user);
    const { firstname, lastname, email, dob, password } = user;

    const newUser = { firstname, lastname, email, dob, password }

    const check = await userService.registration(newUser);
    res.status(201).json({ success: true, msg: "Activation Successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Token Expired!"});
  }
}
//LOGIN
exports.login = async (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      msg: "Please enter your password.",
    });
  }
  else if (!req.body.email) {
    return res.status(400).json({
      success: false,
      msg: "Please enter your email.",
    });
  }
  else try {
    const validation = await validateEmail(req.body.email);
    if(!validation){
      return res.status(400).json({ success: false, msg: "Invalid Email!" })
    }
    if(validation){
      if (req.body.password.length < 6) {
        return res.status(401).send({
          success: false,
          msg: "Password must be at least 6 characters.",
        });
      }
      else{
        const userExists = await userService.checkEmailExist(req.body.email);
        if (!userExists) {
          res.status(401).json({ success: false, msg: "Wrong password or username!" });
        }
        if(!userExists.status){
          res.status(401).json({ success: false, msg: "Invalid Account" });
        }
        const bytes = CryptoJS.AES.decrypt(userExists.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    
        if (originalPassword !== req.body.password) {
          res.status(401).json({ success: false, msg: "Wrong password or username" });
        }
    
        const accessToken = jwt.sign(
          { id: userExists._id, isAdmin: userExists.isAdmin },
          process.env.ACCESS_TOKEN_ACTION,
          { expiresIn: "10h" }
        );
        const { password, ...info } = userExists._doc;
        const refresh_token = await refreshToken({ id: userExists._id, isAdmin: userExists.isAdmin  });
        res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: 'users/refresh_token',
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ ...info, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
//UPDATE
exports.update = async (req, res) => {
  if (req.userExists.id === req.params.id || req.userExists.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    //console.log(req.params.id, req.body);

    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json({ success: false, msg: "You can update only your account!" })
  }
}
//DELETE
exports.delete = async (req, res) => {
  if (req.userExists.id === req.params.id || req.userExists.isAdmin) {
    console.log(req.userExists.isAdmin)
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.status(403).json({ success: false, msg: "User not found!" })
      }
      res.status(200).json({ success: true, msg: "User has been deleted..." });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json({ success: false, msg: "You can delete only your account!" })
  }
}
//FIND
exports.find = async (req, res) => {
  if (req.userExists.id === req.params.id || req.userExists.isAdmin) {
    //console.log(req.userExists.isAdmin)
    try {
      const findUser = await userService.getById(req.params.id);
      if (!findUser) {
        res.status(403).json("User not found!")
      }
      //const { password, ...info } = findUser._doc;
      res.status(200).json(findUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("Only admin can find users")
  }
}
//GET ALL USER
exports.getall = async (req, res) => {
  const query = req.query.new;
  if (req.userExists.isAdmin) {
    //console.log(req.userExists.isAdmin)
    try {
      const findAllUser = query ? await userService.getAlllimit2() : await userService.getAll();
      if (!findAllUser) {
        res.status(403).json("Sorry! We don't have any users here!")
      }
      //const { password, ...info } = findAllUser._doc;
      res.status(200).json(findAllUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("You are not allowed to see all users!")
  }
}
//GET USER STATS
exports.stats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await userService.aggregate();
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}
//COUNT USER
exports.total = async (req, res) => {
  try {
    const data = await userService.count();
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}
//FORGOT PASSWORD
exports.forgot = async (req, res) => {
  try {
    const validation = await validateEmail(req.body.email);
    if(!validation){
      return res.status(400).json({ success: false, msg: "Invalid Email!" })
    }
    if(validation){
      const user = await userService.checkEmailExist(req.body.email);
      //console.log(user)
      if (!user) return res.status(201).json({ success: false, msg: "Re-send the password. Please check your email!" })
      else {
        const tokenAccess = await accessToken({ id: user._id });
        const url = `${CLIENT_URL}/users/reset/${tokenAccess}`;
        console.log(url);
        sendEmail(req.body.email, user.firstname, user.lastname, url, "Reset your Password");
        res.status(201).json({ success: false, msg: "Re-send the password. Please check your email!" })
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
//RESET PASSWORD
exports.reset = async (req, res) => {
  try {
    if (req.body.password.length < 6) {
      return res.status(401).send({
        success: false,
        msg: "Password must be at least 6 characters.",
      });
    }else{
      if (req.body.password === req.body.confirmPassword) {
        //console.log(req.body.password);
        console.log(req.userExists.id);
        const password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY).toString();
        await userService.updatePassword(req.userExists.id, password, { new: true });
        res.status(201).json({
          success: false,
          msg: "Password successfully changed!",
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "Please confirm your new password!",
        })
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
//UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const user = await userService.getById(req.userExists.id);
    //console.log(user.password);
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    //console.log(originalPassword);
    if (originalPassword !== req.body.oldPassword) {
      res.status(400).json("Invalid Password!");
    }
    else {
      if (req.body.newPassword == req.body.confirmPassword) {
        const password = CryptoJS.AES.encrypt(
          req.body.newPassword,
          process.env.SECRET_KEY).toString();
        await userService.updatePassword(req.userExists.id, password, { new: true });
        res.status(201).json("Password successfully changed!");
      }
      else {
        res.status(400).json("Please confirm your new password!");
      }
    }
  } catch (err) {
    //console.log(err)
    res.status(500).json(err);
  }
}
//GET ALL DELETED
exports.getalldeleted = async (req, res) => {
  const query = req.query.new;
  if (req.userExists.isAdmin) {
    //console.log(req.userExists.isAdmin)
    try {
      const findAllUser = query ? await userService.getAllDeletedlimit2() : await userService.getAllDeleted();
      if (!findAllUser) {
        res.status(403).json("Sorry! We don't have any users here!")
      }
      //const { password, ...info } = findAllUser._doc;
      res.status(200).json(findAllUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("You are not allowed to see all users!")
  }
}
//RECOVER
exports.recover = async (req, res) => {
  if (req.userExists.isAdmin) {
    console.log(req.userExists.isAdmin)
    try {
      const restoredUser = await userService.recoverUser(req.params.id);
      if (!restoredUser) {
        res.status(403).json("User not found!")
      }
      res.status(200).json("User has been restored...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("Only admin can restore account!")
  }
}
//PERMANENTLY DELETE
exports.remove = async (req, res) => {

  try {
    const removedUser = await userService.removeUser(req.params.id);
    if (!removedUser) {
      res.status(403).json("User not found!")
    }
    res.status(200).json("User has been removed...");
  } catch (err) {
    res.status(500).json(err);
  }
}
//LOGIN GOOGLE
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    //console.log(tokenId)
    const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID });
    //console.log(verify);
    const { email_verified, given_name, family_name, email, picture } = verify.payload;
    const password = email + process.env.SECRET_KEY;
    if (email_verified) {
      const user = await userService.checkEmailExist(email);
      //console.log(user)
      if (!user) {
        const newUser = {
          firstname: given_name,
          lastname: family_name,
          email: email,
          dob: Date.now(),
          password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
          profilePic: picture,
        }
        const useradd = await userService.registration(newUser);
        console.log(useradd)
        const refresh_token = await refreshToken({ id: useradd._id, isAdmin: useradd.isAdmin });
        res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: 'users/refresh_token',
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(200).json(useradd)
      }
      if (user) {
        const refresh_token = await refreshToken({ id: user._id, isAdmin: user.isAdmin });
        res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: 'users/refresh_token',
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(200).json(user)
      }
      
    }
    else {
      res.status(400).json({ msg: "Email verification failed!" })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
//LOGIN FACEBOOK
exports.facebooklogin = async (req, res) => {
  try {
    const { accessToken, userID } = req.body;
    const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
    const data = await fetch(URL).then(res => res.json()).then(res => { return res })

    //console.log(data)
    //console.log(verify);
    const { name, email, picture } = data;
    //console.log(email)
    const password = email + process.env.SECRET_KEY;
    const user = await userService.checkEmailExist(email);
    //console.log(user)
    if (!user) {
      const newUser = {
        firstname: name,
        lastname: ' ',
        email: email,
        dob: Date.now(),
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
        profilePic: picture.data.url,
      }
      const useradd = await userService.registration(newUser);
      //console.log(useradd)
      const refresh_token = await refreshToken({ id: useradd._id, isAdmin: useradd.isAdmin });
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: 'users/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })
      res.status(200).json(useradd)
    }
    if (user) {
      const refresh_token = await refreshToken({ id: user._id, isAdmin: user.isAdmin });
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: 'users/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })
      res.status(200).json(user)
    }
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: err.message });
  }
}
//GET ACCESS TOKEN
exports.getAccessToken = async (req, res) => {
  try {
      const rf_token = req.cookies.refreshtoken
      //console.log("Lala: ", rf_token)
      if(!rf_token) 
      {
        return res.status(400).json({msg: "Please login now!"})
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_ACTION, async (err, user) => {
        if(err) return res.status(400).json({msg: "Please login now!"})

        const access_token = await accessToken({id: user.id})
        res.json({access_token})
    })
      
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}
//GET USER INFO BY ACCESS TOKEN
exports.getinfo = async (req , res) => {
  try {
    const user = await userService.getUser(req.userExists.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({msg: err.message});
  }
}
//LOG OUT
exports.logout = async (req, res) => {
  try {
      res.clearCookie('refreshtoken', {path: '/api/users'})
      return res.status(200).json({msg: "Logged out."})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}
// function validateEmail(email) {
//   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

// const createrefreshToken = async (payload) => {
//   return await jwt.sign(payload, process.env.REFRESH_TOKEN_ACTION, {
//     expiresIn: "7d",
//   });
// };

// const createaccessToken = async (payload) => {
//   console.log( jwt.sign(payload, process.env.ACCESS_TOKEN_ACTION));
//   return await jwt.sign(payload, process.env.ACCESS_TOKEN_ACTION, {
//     expiresIn: "15m",
//   });
// };

// const createactivationToken = (payload) => {
//   return jwt.sign(payload, process.env.ACTIVATION_TOKEN_ACTION, {
//     expiresIn: "5m",
//   });
// };