"use strict";
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const castController = require("../controllers/castController");
//const { default: Cast } = require("../../client/src/components/cast/Cast");

//ADD
router.post("/add", verifyToken, castController.addCast);
//UPDATE
router.put("/update/:id", verifyToken, castController.update);
//DELETE
router.put("/delete/:id", verifyToken, castController.delete);
//GET
router.get("/find/:id",  castController.find);
//GET ALL
router.get("/", verifyToken, castController.getall);
//TOTAL CAST
router.get("/total", castController.total);
//GET ALL DELETED
router.get("/deleted", verifyToken, castController.getalldeleted);
//RECOVER
router.put("/recover/:id", verifyToken, castController.recover);
//REMOVE
router.delete("/remove/:id", castController.remove);



module.exports = router;
