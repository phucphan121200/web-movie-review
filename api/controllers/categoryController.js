"use strict";

//const mongoose = require('mongoose');
const categoryService = require("../services/categoryService");
//const Country = mongoose.model('Country');

//ADD
exports.addCategory = async (req, res) => {
    if(req.userExists.isAdmin){
    const newCategory = {
        name: req.body.name,
    }
    try{
        if (!req.body.name) {
            res
              .status(401)
              .send({ success: false, msg: "Please fillup required field." });
        }
         else {
            const categoryExists = await categoryService.checkExistCategory(req.body.name);
            if (categoryExists) {
              return res
                .status(400)
                .send({ success: false, msg: "Category already exists" });
            }
        }

        const category = await categoryService.addCategory(newCategory);
        res.status(201).json(category);
    }catch(err){
        res.status(500).json(err);
    }
}else{
    res.status(403).json("Only admin can add Category")
}
}
exports.update = async (req, res) => {
    if(req.userExists.isAdmin){
      //console.log(req.params.id, req.body);
  
      try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body, {new: true});  
        res.status(200).json(updatedCategory);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can change CCategory")
    }
  }
//DELETE
exports.delete = async (req, res) => {
    if(req.userExists.isAdmin){
      console.log(req.userExists.isAdmin)
      try {
        const deletedCategory = await categoryService.deleteCategory(req.params.id);
        if(!deletedCategory){
          res.status(403).json("Category not found!")
        }
        res.status(200).json("Category has been deleted...");
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can delete category!")
    }
  }
//FIND
exports.find = async (req, res) => {
    if(req.userExists.isAdmin){
      //console.log(req.userExists.isAdmin)
      try {
        const findCategory = await categoryService.getById(req.params.id);
        if(!findCategory){
          res.status(403).json("Category not found!")
        }
        //const { password, ...info } = findUser._doc;
        res.status(200).json(findCategory);
      }catch(err){
        res.status(500).json(err);
      }
    }
    else{
      res.status(403).json("Only admin can find users")
    }
  }
  
  //GET ALL CATEGORY
  exports.getall = async (req, res) => {
    const query = req.query.new;
  
      try {
        const findAllCategory = query ? await categoryService.getAlllimit2() : await categoryService.getAll();
        if(!findAllCategory){
          res.status(403).json("Sorry! We don't have any category here!")
        }
        //const { password, ...info } = findAllUser._doc;
        res.status(200).json(findAllCategory);
      }catch(err){
        res.status(500).json(err);
      }
    
  }