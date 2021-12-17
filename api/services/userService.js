"use strict";
const {User, UserSchema} = require("../models/user");

class userService {
    static async registration(data) {
        return await User(data).save();
      }

    static async checkEmailExist(email) {
        return await User.findOne({ email }); 
    }
    static async updateUser(id, data) {
      console.log(id, data);
      return await User.findByIdAndUpdate(id, { $set: data }, {new: true});
    }
    static async updatePassword(id, data){
      console.log(id, data)
      return await User.findByIdAndUpdate(id, {$set: {"password":data}}, {new:true})
    }
    static async deleteUser(id) {
      console.log(id);
      return await User.findByIdAndUpdate(id, { $set: {"status": false} }, {new: true});
    }
    static async getById(id) {
      const user = await User.findById(id);
      const {dob, createdAt, updatedAt, password, ...info} = user._doc
      info.dob = user.dob.getDate()+'-' + (user.dob.getMonth()+1) + '-'+user.dob.getFullYear();
      info.createdAt = user.createdAt.getHours() + ":" + user.createdAt.getMinutes() + ":" + user.createdAt.getSeconds()+' '
        +user.createdAt.getDate()+'-' + (user.createdAt.getMonth()+1) + '-'+user.createdAt.getFullYear();
      info.updatedAt= user.updatedAt.getHours() + ":" + user.updatedAt.getMinutes() + ":" + user.updatedAt.getSeconds()+ ' ' + 
        user.updatedAt.getDate()+'-' + (user.updatedAt.getMonth()+1) + '-'+user.updatedAt.getFullYear();
      info.password = password;
      return info;
    }
    static async getAll() {
      const users = await User.find({"status": true});
      let newUsers = users.map((user) =>({
        isAdmin: user.isAdmin,
        status: user.status,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        dob: user.dob.getDate()+'-' + (user.dob.getMonth()+1) + '-'+user.dob.getFullYear(),
        createdAt: user.createdAt.getHours() + ":" + user.createdAt.getMinutes() + ":" + user.createdAt.getSeconds()+' '+user.createdAt.getDate()+'-' + (user.createdAt.getMonth()+1) + '-'
        +user.createdAt.getFullYear(),
        updatedAt:  user.updatedAt.getHours() + ":" + user.updatedAt.getMinutes() + ":" + user.updatedAt.getSeconds()+ ' ' + user.updatedAt.getDate()+'-' + (user.updatedAt.getMonth()+1) + '-'
        +user.updatedAt.getFullYear(),
        __v: user.__v
      }))
      return await newUsers;
    }
    static async getAlllimit2() {
      const users = await User.find({"status": true}).limit(2);
      let newUsers = users.map((user) =>({
        isAdmin: user.isAdmin,
        status: user.status,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        dob: user.dob.getDate()+'-' + (user.dob.getMonth()+1) + '-'+user.dob.getFullYear(),
        createdAt: user.createdAt.getHours() + ":" + user.createdAt.getMinutes() + ":" + user.createdAt.getSeconds()+' '+user.createdAt.getDate()+'-' + (user.createdAt.getMonth()+1) + '-'
        +user.createdAt.getFullYear(),
        updatedAt: user.updatedAt.getHours() + ":" + user.updatedAt.getMinutes() + ":" + user.updatedAt.getSeconds()+ ' ' + user.updatedAt.getDate()+'-' + (user.updatedAt.getMonth()+1) + '-'
        +user.updatedAt.getFullYear(),
        __v: user.__v
      }))
      return await newUsers;
    }
    static async aggregate(){
      return await User.aggregate ([{ $project: { month: { $month: "$createdAt" },},}
      ,{ $group: { _id: "$month", total: { $sum: 1 },},},]);
    }
    static async count(){
      return await User.find({"status": true}).countDocuments();
    }
    static async getAllDeleted() {
      const users = await User.find({"status": false});
      let newUsers = users.map((user) =>({
        isAdmin: user.isAdmin,
        status: user.status,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        dob: user.dob.getDate()+'-' + (user.dob.getMonth()+1) + '-'+user.dob.getFullYear(),
        createdAt: user.createdAt.getHours() + ":" + user.createdAt.getMinutes() + ":" + user.createdAt.getSeconds()+' '+user.createdAt.getDate()+'-' + (user.createdAt.getMonth()+1) + '-'
        +user.createdAt.getFullYear(),
        updatedAt:  user.updatedAt.getHours() + ":" + user.updatedAt.getMinutes() + ":" + user.updatedAt.getSeconds()+ ' ' + user.updatedAt.getDate()+'-' + (user.updatedAt.getMonth()+1) + '-'
        +user.updatedAt.getFullYear(),
        __v: user.__v
      }))
      return newUsers
    }
    static async getAllDeletedlimit2() {
      const users = await User.find({"status": false}).limit(2);
      let newUsers = users.map((user) =>({
        isAdmin: user.isAdmin,
        status: user.status,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profilePic: user.profilePic,
        dob: user.dob.getDate()+'-' + (user.dob.getMonth()+1) + '-'+user.dob.getFullYear(),
        createdAt: user.createdAt.getUTCHours() + ":" + user.createdAt.getUTCMinutes() + ":" + user.createdAt.getUTCSeconds()+' '+user.createdAt.getDate()+'-' + (user.createdAt.getMonth()+1) + '-'
        +user.createdAt.getFullYear(),
        updatedAt:  user.updatedAt.getUTCHours() + ":" + user.updatedAt.getUTCMinutes() + ":" + user.updatedAt.getUTCSeconds()+ ' ' + user.updatedAt.getDate()+'-' + (user.updatedAt.getMonth()+1) + '-'
        +user.updatedAt.getFullYear(),
        __v: user.__v
      }))
      return newUsers
    }
    static async recoverUser(id) {
      console.log(id);
      return await User.findByIdAndUpdate(id, { $set: {"status": true} }, {new: true});
    }
    static async removeUser(id) {
      console.log(id);
      return await User.findByIdAndRemove(id);
    }
    static async getUser(id) {
      return await User.findOne({_id: id}).select('-password');
    }
}
module.exports = userService;