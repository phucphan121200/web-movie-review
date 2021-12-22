"use strict";

const genreService = require("../services/genreService");

//ADD
exports.addGenre = async (req, res) => {
    if (req.userExists.isAdmin) {
        const newGenre = {
            name: req.body.name,
        }
        try {
            if (!req.body.name) {
                res
                    .status(401)
                    .send({ success: false, msg: "Please fillup required field." });
            }
            else {
                const GenreExists = await genreService.checkExistGenre(req.body.name);
                if (GenreExists) {
                    return res
                        .status(400)
                        .send({ success: false, msg: "Genre already exists" });
                }
                else{
                    const Genre = await genreService.addGenre(newGenre);
                    res.status(201).json(Genre);
                }
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Only admin can add Genre")
    }
}
exports.update = async (req, res) => {
    if (req.userExists.isAdmin) {
        //console.log(req.params.id, req.body);

        try {
            const updatedGenre = await genreService.updateGenre(req.params.id, req.body, { new: true });
            res.status(200).json(updatedGenre);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("Only admin can change Genre")
    }
}
//DELETE
exports.delete = async (req, res) => {
    if (req.userExists.isAdmin) {
        console.log(req.userExists.isAdmin)
        try {
            const deletedGenre = await genreService.deleteGenre(req.params.id);
            if (!deletedGenre) {
                res.status(403).json("Genre not found!")
            }
            res.status(200).json("Genre has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("Only admin can delete Genre!")
    }
}
//FIND
exports.find = async (req, res) => {
    //console.log(req.userExists.isAdmin)
    try {
        const findGenre = await genreService.getById(req.params.id);
        if (!findGenre) {
            res.status(403).json("Genre not found!")
        }
        //const { password, ...info } = findUser._doc;
        res.status(200).json(findGenre);
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL Genre
exports.getall = async (req, res) => {
    const query = req.query.new;
    //console.log(req.userExists.isAdmin)
    try {
        const findAllGenre = query ? await genreService.getAlllimit2() : await genreService.getAll();
        if (!findAllGenre) {
            res.status(403).json("Sorry! We don't have any Genre here!")
        }
        //const { password, ...info } = findAllUser._doc;
        res.status(200).json(findAllGenre);
    } catch (err) {
        res.status(500).json(err);
    }
}