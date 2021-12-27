"use strict";

const mongoose = require('mongoose');
const favoriteService = require("../services/favoriteService");
//const { Character } = require('../models/character');
//const {Movie, MovieSchema} = require("../models/movie");
//const Country = mongoose.model('Country');
const { Favorite, favoriteschema } = require("../models/favorite");

//ADD
exports.add = async (req, res) => {
    const favorites = await favoriteService.checkExistUser(req.userExists.id)
    //console.log(req.body.reviewItems.rating);
    if (favorites) {
        const isAddedMovie = favorites.favoriteItems.find(c => c.movie == req.body.favoriteItems.movie);
        //const isMovie = req.body.favoriteItems.movie;
        console.log(isAddedMovie)
        if (isAddedMovie) {
            try {
                const deleteItem = await Favorite.findOneAndUpdate(
                    { user: req.userExists.id }
                    ,{
                      $pull: {
                        favoriteItems: {
                          movie: req.body.favoriteItems.movie,
                        }
                      }
                    } , { new: true }
                  );
                //console.log(review)
                res.status(201).json(deleteItem);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            try {
                const favorite = await favoriteService.checkExistUserandUpdate(req.userExists.id, {
                    "favoriteItems": req.body.favoriteItems
                }
                    , { new: true });
                //console.log(review)
                res.status(201).json(favorite);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        //res.status(200).json({ message: favorites });
    } else {
        const newFavorite = {
            user: req.userExists.id,
            favoriteItems: req.body.favoriteItems, 
        }
        //console.log(newReview)
        try {
            const favorite = await favoriteService.addFavorite(newFavorite);
            res.status(201).json(favorite);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

//GET
exports.find = async (req, res) => {
    try {
      console.log(req.userExists.id)
      const findFavorite = await favoriteService.getFavoritebyUser(req.userExists.id);
      console.log(findFavorite);
  
      if (!findFavorite) {
        res.status(404).json({msg: "Add to FavoriteList now!"})
      }
      if(findFavorite){
        let favoriteItems ={};
        findFavorite.favoriteItems.forEach((item, index) => {
            favoriteItems[item.movie._id.toString()]={
            _id: item.movie._id.toString(),
            title: item.movie.title,
            lastname: item.movie.img,
            profilePic: item.movie.limit,
            rating: item.movie.trailer,
            releaseDate: item.movie.releaseDate
          }
        });
        res.status(200).json(findFavorite);
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  }