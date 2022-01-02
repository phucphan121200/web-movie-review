"use strict"

const {Movie, MovieSchema} = require("../models/movie");
const mongoose = require("mongoose")

class movieService{
    static async addMovie(data) {
        return await Movie(data).save();
    }
    static async findMovie(id){
        return await Movie.findOne( { _id: id });
    }
    static async checkExistMovie(title){
        return await Movie.findOne( { title });
    }
    static async updateMovie(id, data) {
        //console.log(id, data);
        return await Movie.findByIdAndUpdate(id, 
            { $set: {
                "title": data.title,
                "desc": data.desc,
                "releaseDate": data.releaseDate,
                "limit": data.limit,
                "site": data.site
            } }, {new: true});
    }
    static async deleteMovie(id) {
        console.log(id);
        return await Movie.findByIdAndUpdate(id, { $set: {"status": false} }, {new: true});
    }
    static async getById(id) {
        const movie = await Movie.findById(id).
        populate("productionItems.production","_id name founder foundingdate").
        populate("categoryItems.category", "_id name").
        populate("castItems.character", "_id name cast");
        // const {releaseDate, ...info} = movie._doc;
        // info.releaseDate = movie.releaseDate.getDate()+'/' + (movie.releaseDate.getMonth()+1) + '/'+movie.releaseDate.getFullYear();
        return movie;
      }
    static async getAll() {
        return await Movie.find({"status": true}).
        populate("productionItems.production","_id name founder foundingdate").
        populate("categoryItems.category", "_id name").
        populate("castItems.character", "_id name cast");
      }
    static async getAlllimit2() {
        return await Movie.find({"status": true}).limit(2).
        populate("productionItems.production","_id name founder foundingdate").
        populate("categoryItems.category", "_id name").
        populate("castItems.character", "_id name cast");
      }
      static async checkExistMovieCategoryandUpdate(title, cate, data){
        //console.log(cate, title, data)
        return await Movie.findOneAndUpdate({"title": title, "categoryItems.category": cate}, {$set: {"categoryItems.$": data}}, {new: true});
    }
    static async checkExistMovieProductionandUpdate(title, cate, data){
        //console.log(cate, title, data)
        return await Movie.findOneAndUpdate({"title": title, "productionItems.production": cate}, {$set: {"productionItems.$": data}}, {new: true});
    }
    static async checkExistCategoryandUpdate(title, data){
        //console.log(title, data)
        return await Movie.findOneAndUpdate({title}, {"$push": data}, {new: true});
    }
    static async getAllMoviebyGener(id) {
        return await Movie.aggregate([
            {$match: {"categoryItems.category" : mongoose.Types.ObjectId(id)}},
            
        ])
    }
    static async getAllMoviebyProduction(id) {
        return await Movie.aggregate([
            {$match: {"productionItems.production" : mongoose.Types.ObjectId(id)}},
            
        ])
    }
    static async count(){
        return await Movie.find({"status": true}).countDocuments();
      }
    static async getAllDeleted() {
        return await Movie.find({"status": false}).
        populate("productionItems.production","_id name founder foundingdate").
        populate("categoryItems.category", "_id name").
        populate("castItems.character", "_id name cast");;
      }
    static async getAllDeletedlimit2() {
        return await Movie.find({"status": false}).limit(2).
        populate("productionItems.production","_id name founder foundingdate").
        populate("categoryItems.category", "_id name").
        populate("castItems.character", "_id name cast");;
      }
    static async recover(id) {
        console.log(id);
        return await Movie.findByIdAndUpdate(id, { $set: {"status": true} }, {new: true});
      }
    static async remove(id) {
        console.log(id);
        return await Movie.findByIdAndRemove(id);
      }
}

module.exports = movieService;