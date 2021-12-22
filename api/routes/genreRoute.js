"use strict";
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const genreController = require("../controllers/genreController");

//ADD
router.post("/add", verifyToken, genreController.addGenre);
//UPDATE
router.put("/update/:id", verifyToken, genreController.update);
//DELETE
router.put("/delete/:id", verifyToken, genreController.delete);
//GET
router.get("/find/:id", genreController.find);
//GET ALL
router.get("/", genreController.getall);

module.exports = router;