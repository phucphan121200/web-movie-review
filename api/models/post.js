const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {type: String, default: ""},
        content: {type: String, default: ""},
        desc: {type: String, default: ""},
        thumbnail: {type: String, default: "https://static-cse.canva.com/blob/651263/youtube.jpg"},
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre",
            default: "61b99d16a9851c3fbcfb3cfb"
        },
        status:{type: Boolean, default: false},
        hid: {type: Boolean, default: false},
        seen: {type: Number, default: 0},
        dateCreate: {type: Date, default: Date.now()},
        like: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post, PostSchema };