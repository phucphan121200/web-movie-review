"use strict";

//const mongoose = require('mongoose');
const productionService = require("../services/productionService");
//const Country = mongoose.model('Country');

//ADD
exports.addProduction = async (req, res) => {
   
    const newProduction = {
        name: req.body.name,
        founder: req.body.founder,
        foundingdate: req.body.foundingdate,
        // country: 
        //      {
        //         _id: new mongoose.Types.ObjectId(),
        //         name: req.body.country
        //      }
    }
    try{
        if (!req.body.name || !req.body.founder  || !req.body.foundingdate) {
            res
              .status(401)
              .send({ success: false, msg: "Please fillup required field." });
        }
         else {
            const productionExists = await productionService.checkExistProduction(req.body.name);
            if (productionExists) {
              return res
                .status(400)
                .send({ success: false, msg: "Production already exists" });
            }
        }

        const production = await productionService.addProduction(newProduction);
        res.status(201).json(production);
    }catch(err){
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    if(req.userExists.isAdmin){
      if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
      //console.log(req.params.id, req.body);
  
      try {
        const updatedProduction = await productionService.updateProduction(req.params.id, req.body, {new: true});  
        res.status(200).json(updatedProduction);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can change Production")
    }
  }
//DELETE
exports.delete = async (req, res) => {
    if(req.userExists.isAdmin){
      console.log(req.userExists.isAdmin)
      try {
        const deletedProduction = await productionService.deleteProduction(req.params.id);
        if(!deletedProduction){
          res.status(403).json("Production not found!")
        }
        res.status(200).json("Production has been deleted...");
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can delete production!")
    }
  }
//FIND
exports.find = async (req, res) => {
    if(req.userExists.isAdmin){
      //console.log(req.userExists.isAdmin)
      try {
        const findProduction = await productionService.getById(req.params.id);
        if(!findProduction){
          res.status(403).json("Production not found!")
        }
        //const { password, ...info } = findUser._doc;
        res.status(200).json(findProduction);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can find users")
    }
  }
  
  //GET ALL USER
  exports.getall = async (req, res) => {
    const query = req.query.new;
    if(req.userExists.isAdmin){
      //console.log(req.userExists.isAdmin)
      try {
        const findAllProduction = query ? await productionService.getAlllimit2() : await productionService.getAll();
        if(!findAllProduction){
          res.status(403).json("Sorry! We don't have any production here!")
        }
        //const { password, ...info } = findAllUser._doc;
        res.status(200).json(findAllProduction);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("You are not allowed to see all users!")
    }
  }