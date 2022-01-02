const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: {type: Date},
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" },
    isAdmin: { type: Boolean, default: false },
    status: {type: Boolean, default: true}
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {User, UserSchema};