"use strict";
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const categoryController = require("../controllers/categoryController");

//ADD
router.post("/add", verifyToken, categoryController.addCategory);
//UPDATE
router.put("/update/:id", verifyToken, categoryController.update);
//DELETE
router.put("/delete/:id", verifyToken, categoryController.delete);
//GET
router.get("/find/:id", verifyToken, categoryController.find);
//GET ALL
router.get("/", categoryController.getall);

module.exports = router;