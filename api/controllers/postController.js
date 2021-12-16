"use strict";

const { Post } = require("../models/post");
const postService = require("../services/postService");

//ADD
exports.add = async (req, res) => {
    const { title, content, desc, thumbnail, genre } = req.body;
    const newPost = {
        user: req.userExists.id,
        title: title,
        content: content,
        desc: desc,
        thumbnail: thumbnail,
        genre: genre
    }
    try {
        const existTitle = await postService.checkExistPost(title);
        if (existTitle) {
            res.status(400).json({ msg: "This title has already exist!" });
        }
        else if (content.length < 20 || content.length > 200) {
            res.status(400).json({ msg: "Must between 20-200" });
        }
        else if (desc.length < 2000) {
            res.status(400).json({ msg: "Your post must be more than 2000 characters" });
        }
        else if (!genre) {
            res.status(400).json({ msg: "Please choose Category of Post" });
        }
        else {
            const post = await postService.addPost(newPost);
            res.status(201).json(post);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//CREATE TEMP POST
exports.createpost = async (req, res) => {
    const newPost = {
        user: req.userExists.id,
    }
    try {
        const post = await postService.addPost(newPost);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}
//AUTO SAVE
exports.autosave = async (req, res) => {
    console.log(req.params.id)
    const checkUser = await postService.getPost(req.params.id);
    console.log(checkUser)
    if (checkUser.user == req.userExists.id) {
        const { title, content, desc, thumbnail, genre } = req.body;
        const autosavePost = {
            user: req.userExists.id,
            title: title,
            content: content,
            desc: desc,
            thumbnail: thumbnail,
            genre: genre
        }
        try {
            const post = await postService.autosavePost(req.params.id, autosavePost, { new: true });
            res.status(201).json(post);
        } catch (err) {
            res.status(500).json({ msg: err });
        }
    }
    else {
        res.status(404).json({ msg: "Post not found!" });
    }
}
//CREATE POST
exports.save = async (req, res) => {
    const checkUser = await postService.getPost(req.params.id);
    console.log(checkUser.user._id)
    console.log(req.userExists.id)
    if (checkUser.user._id == req.userExists.id) {
        const { title, content, desc, thumbnail, genre } = req.body;
        const autosavePost = {
            user: req.userExists.id,
            title: title,
            content: content,
            desc: desc,
            thumbnail: thumbnail,
            genre: genre,
            status: true,
            dateCreate: Date.now()
        }
        try {
            if (content.length < 20 || content.length > 200) {
                res.status(400).json({ msg: "Must between 20-200" });
            }
            else if (desc.length < 2000) {
                res.status(400).json({ msg: "Your post must be more than 2000 characters" });
            }
            else if (!genre) {
                res.status(400).json({ msg: "Please choose Category of Post" });
            }
            else {
                const post = await postService.savePost(req.params.id, autosavePost, { new: true });
                res.status(201).json(post);
            }
        } catch (err) {
            res.status(500).json({ msg: err });
        }
    }
    else {
        res.status(404).json({ msg: "Post not found!" });
    }
}
//HIDE POST
exports.hide = async (req, res) => {
    const checkUser = await postService.getPost(req.params.id);
    console.log(checkUser);
    if (checkUser.user == req.userExists.id || req.userExists.isAdmin) {
        try {
            const deletePost = await postService.deletePost(req.params.id);
            res.status(200).json(deletePost);
        } catch (err) {
            res.status(500).json({ msg: err });
        }
    } else {
        res.status(404).json({ msg: "Post not found!" });
    }
}
//RECOVER POST
exports.recover = async (req, res) => {
    const checkUser = await postService.getPost(req.params.id);
    console.log(checkUser);
    console.log(req.userExists.id)
    if (checkUser.user == req.userExists.id) {
        try {
            const deletePost = await postService.recoverPost(req.params.id);
            res.status(200).json(deletePost);
        } catch (err) {
            res.status(500).json({ msg: err });
        }
    } else {
        res.status(404).json({ msg: "Post not found!" });
    }
}
//REMOVE POST
exports.remove = async (req, res) => {
    const checkUser = await postService.getPost(req.params.id);
    console.log(checkUser);
    if (checkUser.user == req.userExists.id) {
        try {
            const deletePost = await postService.removePost(req.params.id);
            res.status(200).json({ msg: "Delete post successfully" });
        } catch (err) {
            res.status(500).json({ msg: err });
        }
    } else {
        res.status(404).json({ msg: "Post not found!" });
    }
}
//GET POST
exports.get = async (req, res) => {
    try {
        const getPost = await postService.getPost(req.params.id);
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {

            const peopleSeen = getPost.seen + 1;
            await postService.gainSeen(req.params.id, peopleSeen)
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET ALL POST
exports.getall = async (req, res) => {
    try {
        const getPost = await postService.getAllPost();
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET ALL POST BY GENRE
exports.getallbygenre = async (req, res) => {
    try {
        const getPost = await postService.getPostbyGenre(req.body.genre);
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET ALL PUBLISH POST BY USER
exports.getallpublishbyuser = async (req, res) => {
    try {
        const getPost = await postService.getPostPublishbyUser(req.userExists.id);
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET ALL WRITING POST BY USER
exports.getallwritingbyuser = async (req, res) => {
    try {
        const getPost = await postService.getPostWritingbyUser(req.userExists.id);
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET ALL HIDDEN POST BY USER
exports.getallhiddenbyuser = async (req, res) => {
    try {
        const getPost = await postService.getPostHiddenbyUser(req.userExists.id);
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET POPPULAR POST
exports.getpopular = async (req, res) => {
    try {
        const getPost = await postService.getPostPopular();
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//UPDATE POST
exports.update = async (req, res) => {
    const checkUser = await postService.getPost(req.params.id);
    console.log(checkUser.user._id)
    console.log(req.userExists.id)
    if (checkUser.user._id == req.userExists.id) {
        const { title, content, desc, thumbnail, genre } = req.body;
        const autosavePost = {
            user: req.userExists.id,
            title: title,
            content: content,
            desc: desc,
            thumbnail: thumbnail,
            genre: genre
        }
        try {
            if (content.length < 20 || content.length > 200) {
                res.status(400).json({ msg: "Must between 20-200" });
            }
            else if (desc.length < 2000) {
                res.status(400).json({ msg: "Your post must be more than 2000 characters" });
            }
            else if (!genre) {
                res.status(400).json({ msg: "Please choose Category of Post" });
            }
            else {
                const post = await postService.savePost(req.params.id, autosavePost, { new: true });
                res.status(201).json(post);
            }
        } catch (err) {
            res.status(500).json({ msg: err });
        }
    }
    else {
        res.status(404).json({ msg: "Post not found!" });
    }
}
//LIKE
exports.like = async (req, res) => {
    const posts = await postService.getPost(req.params.id)
    if (posts) {
        const isLiked = posts.like.find(c => c.user == req.userExists.id);
        console.log(isLiked)
        if (isLiked) {
            try {
                const removeLike = await Post.findOneAndUpdate(
                    { _id: req.params.id }
                    ,{
                      $pull: {
                        like: {
                          user: req.userExists.id,
                        }
                      }
                    } , { new: true }
                  );
                res.status(200).json(removeLike);
            } catch (err) {
                res.status(500).json({ msg: err });
            }
        } else {
            try {
                const review = await postService.checkExistUserandUpdate(req.params.id, {
                    "like": [
                        {
                            user: req.userExists.id,
                        }
                    ]
                }
                    , { new: true });
                //console.log(review)
                res.status(201).json(review);
            } catch (err) {
                res.status(500).json({ msg: err });
            }
        }
        //res.status(200).json({ message: posts });
    } else {
        res.status(404).json({msg: "Post not found!"});
    }
}
//COUNT LIKE
exports.likecount = async (req, res) => {
    try {
        const like = await postService.countLike(req.params.id)
        res.status(200).json({ countlike: like });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET MOST LIKE POST
exports.getmostlike = async (req, res) => {
    try {
        const getPost = await postService.getPostMostLike();
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
//GET NEW POST
exports.getnew = async (req, res) => {
    try {
        const getPost = await postService.getPostNew();
        if (!getPost) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            res.status(200).json(getPost);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}