"use strict";

const mongoose = require('mongoose');
const reviewService = require("../services/reviewService");
//const { Character } = require('../models/character');
//const {Movie, MovieSchema} = require("../models/movie");
//const Country = mongoose.model('Country');
const { Review, ReviewSchema } = require("../models/Review");

//ADD
exports.addReview = async (req, res) => {
  const reviews = await reviewService.checkExistMovie(req.body.movie)
  console.log(req.body);
  if (reviews) {
    const isReviewed = reviews.reviewItems.find(c => c.user == req.userExists.id);
    const isUser = req.userExists.id
    console.log(isReviewed)
    if(isReviewed){
      try {
        const review = await reviewService.checkExistMovieUserandUpdate(req.body.movie, isUser, {
          user: req.userExists.id,
          rating: req.body.reviewItems.rating,
          text: req.body.reviewItems.text,
        }
          , { new: true });
        //console.log(review)
        res.status(201).json(review);
      } catch (err) {
        res.status(500).json(err);
      }
    }else{
      try {
        const review = await reviewService.checkExistMovieandUpdate(req.body.movie, {
          "reviewItems": [
            {
              user: req.userExists.id,
              rating: req.body.reviewItems.rating,
              text: req.body.reviewItems.text,
            }
          ]
        }
          , { new: true });
        //console.log(review)
        res.status(201).json(review);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    //res.status(200).json({ message: reviews });
  } else {
    const newReview = {
      movie: req.body.movie,
      reviewItems: [
        {
          user: req.userExists.id,
          rating: req.body.reviewItems.rating,
          text: req.body.reviewItems.text,
        }
      ],
    }
    //console.log(newReview)
    try {
      const review = await reviewService.addReview(newReview);
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
//UPDATE
exports.update = async (req, res) => {
  const reviews = await reviewService.checkExistMovie(req.body.movie)
  const isUser = req.userExists.id
  const isReviewed = reviews.reviewItems.find(c => c.user == req.userExists.id)
  //console.log(isReviewed)
  if (isReviewed) {
    try {
      const review = await reviewService.checkExistMovieUserandUpdate(req.body.movie, isUser, {
        user: req.userExists.id,
        rating: req.body.reviewItems.rating,
        text: req.body.reviewItems.text,
      }
        , { new: true });
      //console.log(review)
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
//DELETE
exports.delete = async (req, res) => {
  try {
      const test = await Review.findOneAndUpdate(
        { movie: req.body.movie }
        ,{
          $pull: {
            reviewItems: {
              user: req.userExists.id,
            }
          }
        }
      );
      res.status(200).json(test);
  } catch (err) {
    res.status(500).json(err);
  }
}
//GET
exports.find = async (req, res) => {
  //console.log(req.userExists.isAdmin)
  // Review.findOne({ movie: req.params.id })
  // .populate("reviewItems.user",  "_id firstname lastname profilePic")
  // .exec((error, review) => {
  //   if (error) return res.status(400).json({ error });
  //   if (review) {
  //     console.log(review)
  //     let reviewItems ={};
  //     review.reviewItems.forEach((item, index) => {
  //       reviewItems[item.user._id.toString()]={
  //         _id: item.user._id.toString(),
  //         firstname: item.user.firstname,
  //         lastname: item.user.lastname,
  //         profilePic: item.user.profilePic,
  //         rating: item.rating,
  //         text: item.text
  //       }
  //     });
  //     res.status(200).json({reviewItems});
  //   }
  // });
  try {
    const findReview = await reviewService.getReviewbyMovie(req.params.id);
    console.log(findReview.reviewItems)

    if (!findReview) {
      res.status(403).json("Review not found!")
    }
    if(findReview){
      let reviewItems ={};
      findReview.reviewItems.forEach((item, index) => {
        reviewItems[item.user._id.toString()]={
          _id: item.user._id.toString(),
          firstname: item.user.firstname,
          lastname: item.user.lastname,
          profilePic: item.user.profilePic,
          rating: item.rating,
          text: item.text
        }
      });
      res.status(200).json(findReview);
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
}
//GET ALL USER
exports.getall = async (req, res) => {
  const query = req.query.new;
  if(req.userExists.isAdmin){
    //console.log(req.userExists.isAdmin)
    try {
      const findAllReview = query ? await reviewService.getAlllimit2() : await reviewService.getAll();
      if(!findAllReview){
        res.status(403).json("Sorry! We don't have any review here!")
      }
      //const { password, ...info } = findAllUser._doc;
      res.status(200).json(findAllReview);
    }catch(err){
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json("You are not allowed to see all review!")
  }
}
//GET RATING MOVIE
exports.getallrating = async (req, res) => {
  try {
    const data = await reviewService.getRating(req.params.id);
    //console.log(data.reviewItems)
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err)
  }
}