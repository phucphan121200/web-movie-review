"use strict";
const {User, UserSchema} = require("../models/user");

class userService {
    static async registration(data) {
        // const userData = new User({
        //     firstname: data.firstname,
        //     lastname: data.lastname,
        //     email: data.email,
        //     dob: data.dob,
        //     password: data.password,
        // });
        return await User(data).save();
      }

    static async checkEmailExist(email) {
        return await User.findOne({ email }); 
    }
    static async updateUser(id, data) {
      console.log(id, data);
      return await User.findByIdAndUpdate(id, { $set: data }, {new: true});
    }
    static async deleteUser(id) {
      console.log(id);
      return await User.findByIdAndUpdate(id, { $set: {"status": false} }, {new: true});
    }
    static async getById(id) {
      return await User.findById(id);
    }
    static async getAll() {
      return await User.find({"status": true});
    }
    static async getAlllimit2() {
      return await User.find({"status": true}).limit(2);
    }
    static async aggregate(){
      return await User.aggregate ([{ $project: { month: { $month: "$createdAt" },},}
      ,{ $group: { _id: "$month", total: { $sum: 1 },},},]);
    }
}
module.exports = userService;