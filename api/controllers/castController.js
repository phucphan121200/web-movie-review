"use strict";

//const mongoose = require('mongoose');
const castService = require("../services/castService");
//const Country = mongoose.model('Country');

//ADD
exports.addCast = async (req, res) => {
    if(req.userExists.isAdmin){
    const newCast = {
        name: req.body.name,
        bio: req.body.bio,
        dob: req.body.dob,
        castPic: req.body.castPic
        // country: 
        //      {
        //         _id: new mongoose.Types.ObjectId(),
        //         name: req.body.country
        //      }
    }
    try{
        if (!req.body.name) {
            res
              .status(401)
              .send({ success: false, msg: "Please fillup required field." });
        }
        const cast = await castService.addCast(newCast);
        res.status(201).json(cast);
    }catch(err){
        res.status(500).json(err);
    }
}else{
    res.status(403).json("Only admin can add Cast")
}
}
exports.update = async (req, res) => {
    if(req.userExists.isAdmin){
      //console.log(req.params.id, req.body);
  
      try {
        const updatedCast = await castService.updateCast(req.params.id, req.body, {new: true});  
        res.status(200).json(updatedCast);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can change Cast")
    }
  }
//DELETE
exports.delete = async (req, res) => {
    if(req.userExists.isAdmin){
      console.log(req.userExists.isAdmin)
      try {
        const deletedCast = await castService.deleteCast(req.params.id);
        if(!deletedCast){
          res.status(403).json("Cast not found!")
        }
        res.status(200).json("Cast has been deleted...");
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can delete cast!")
    }
  }
//FIND
exports.find = async (req, res) => {
   
      try {
        const findCast = await castService.getById(req.params.id);
        if(!findCast){
          res.status(403).json("Cast not found!")
        }
        //const { password, ...info } = findUser._doc;
        res.status(200).json(findCast);
      }catch(err){
        res.status(500).json(err);
      }
   
  }
  
  //GET ALL CATEGORY
  exports.getall = async (req, res) => {
    const query = req.query.new;
    if(req.userExists.isAdmin){
      //console.log(req.userExists.isAdmin)
      try {
        const findAllCast = query ? await castService.getAlllimit2() : await castService.getAll();
        if(!findAllCast){
          res.status(403).json("Sorry! We don't have any cast here!")
        }
        //const { password, ...info } = findAllUser._doc;
        res.status(200).json(findAllCast);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("You are not allowed to see all casts!")
    }
  }
  exports.total = async (req, res) => {
    try {
      const data = await castService.count();
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
}
//GET ALL DELETED
exports.getalldeleted = async (req, res) => {
  const query = req.query.new;
  if (req.userExists.isAdmin) {
    //console.log(req.userExists.isAdmin)
    try {
      const findAllCast = query ? await castService.getAllDeletedlimit2() : await castService.getAllDeleted();
      if (!findAllCast) {
        res.status(403).json("Sorry! We don't have any casts here!")
      }
      //const { password, ...info } = findAllUser._doc;
      res.status(200).json(findAllCast);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("You are not allowed to see all casts!")
  }
}
//RECOVER
exports.recover = async (req, res) => {
  if (req.userExists.isAdmin) {
    console.log(req.userExists.isAdmin)
    try {
      const restoredCast = await castService.recoverUser(req.params.id);
      if (!restoredCast) {
        res.status(403).json("Cast not found!")
      }
      res.status(200).json("Cast has been restored...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("Only admin can restore cast!")
  }
}
//RECOVER
exports.recover = async (req, res) => {
  if (req.userExists.isAdmin) {
    console.log(req.userExists.isAdmin)
    try {
      const restoredCast = await castService.recoverUser(req.params.id);
      if (!restoredCast) {
        res.status(403).json("Cast not found!")
      }
      res.status(200).json("Cast has been restored...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.status(403).json("Only admin can restore casts!")
  }
}
//PERMANENTLY DELETE
exports.remove = async (req, res) => {
 
    try {
      const removedCast = await castService.removeUser(req.params.id);
      if (!removedCast) {
        res.status(403).json("Cast not found!")
      }
      res.status(200).json("Cast has been removed...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
 

