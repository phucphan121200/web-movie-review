"use strict"

const {Genre, GenreSchema} = require("../models/genre");

class genreService{
    static async addGenre(data) {
        return await Genre(data).save();
    }
    static async checkExistGenre(name){
        return await Genre.findOne( { name });
    }
    static async updateGenre(id, data) {
        console.log(id, data);
        return await Genre.findByIdAndUpdate(id, { $set: data }, {new: true});
    }
    static async deleteGenre(id) {
        console.log(id);
        return await Genre.findByIdAndUpdate(id, { $set: {"status": false} }, {new: true});
    }
    static async getById(id) {
        return await Genre.findById(id);
      }
    static async getAll() {
        return await Genre.find({"status": true});
      }
    static async getAlllimit2() {
        return await Genre.find({"status": true}).limit(2);
      }
}

module.exports = genreService;