"use strict"

const { Post, PostSchema } = require("../models/post");

class postService {
    static async addPost(data) {
        return await Post(data).save();
    }
    static async publishPost(data) {
        return await Post(data).save();
    }
    static async checkExistPost(title) {
        return await Post.findOne({ title });
    }
    static async autosavePost(id, data) {
        return await Post.findByIdAndUpdate(id, { $set: data }, { new: true });
    }
    static async getPost(id) {
        return await Post.findOne({ _id: id }).
            populate("user", "_id firstname lastname profilePic").
            populate("genre", "_id name");
    }
    static async savePost(id, data) {
        return await Post.findByIdAndUpdate(id, { $set: data }, { new: true });
    }
    static async deletePost(id) {
        return await Post.findByIdAndUpdate(id, { $set: { "hid": true } }, { new: true });
    }
    static async recoverPost(id) {
        return await Post.findByIdAndUpdate(id, { $set: { "hid": false } }, { new: true });
    }
    static async removePost(id) {
        return await Post.findByIdAndRemove(id);
    }
    static async getAllPost() {
        return await Post.find({ "status": true, "hid": false }).
            populate("user", "_id firstname lastname profilePic").
            populate("genre", "_id name");
    }
    static async getPostbyGenre(data) {
        return await Post.find({ "genre": data, "status": true, "hid": false }).
            populate("user", "_id firstname lastname profilePic").
            populate("genre", "_id name");
    }
    static async getPostPublishbyUser(data) {
        return await Post.find({ "user": data, "status": true, "hid": false })
    }
    static async getPostWritingbyUser(data) {
        return await Post.find({ "user": data, "status": false, "hid": false })
    }
    static async getPostHiddenbyUser(data) {
        return await Post.find({ "user": data, "hid": true })
    }
    static async gainSeen(id, data) {
        return await Post.findByIdAndUpdate(id, { $set: { "seen": data } }, { new: true });
    }
    static async getPostPopular() {
        let now = new Date();
        // Set the date 14 days in the past
        now = new Date(now.setDate(now.getDate() - 7));
        return await Post.find({
            "status": true, "hid": false
            , "dateCreate": { $gte: now }
        }).
            populate("user", "_id firstname lastname profilePic").
            populate("genre", "_id name").sort({ "seen": -1 }).limit(5);
    }
    static async removeLike(id, user) {
        return await Post.findOneAndUpdate(
            { _id: id }
            , {
                $pull: {
                    like: {
                        user: user,
                    }
                }
            }, { new: true }
        );
    }
    static async checkExistUserandUpdate(id, data) {
        return await Post.findOneAndUpdate({ _id: id }, { "$push": data }, { new: true });
    }
    static async countLike(id) {
        const getPost = await Post.findOne({ _id: id });
        return getPost.like.length;
    }
    static async getPostMostLike() {
        let now = new Date();
        // Set the date 14 days in the past
        now = new Date(now.setDate(now.getDate() - 7));
        return await Post.find({
            "status": true, "hid": false
            , "dateCreate": { $gte: now }
        }).
            populate("user", "_id firstname lastname profilePic").
            populate("genre", "_id name").sort({ "like": -1 }).limit(5);
    }
    static async getPostNew() {
        return await Post.find({
            "status": true, "hid": false
        }).
            populate("user", "_id firstname lastname profilePic").
            populate("genre", "_id name").sort({ "dateCreate": -1 }).limit(10);
    }
}

module.exports = postService;