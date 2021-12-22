"use strict";
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const postController = require("../controllers/postController");

//ADD
router.post("/add", verifyToken, postController.add);
//PUBLISH
router.post("/publish", verifyToken, postController.publish);
//CREATE POST
router.post("/createpost", verifyToken, postController.createpost);
//AUTO SAVE POST
router.put("/autosave/:id", verifyToken, postController.autosave);
//SAVE POST
router.put("/save/:id", verifyToken, postController.save);
//HIDE POST
router.put("/hide/:id", verifyToken, postController.hide);
//RECOVER POST
router.put("/recover/:id", verifyToken, postController.recover);
//DELETE POST
router.delete("/remove/:id", verifyToken, postController.remove);
//GET POST
router.get("/get/:id", postController.get);
//GET ALL POST
router.get("/", postController.getall);
//GET ALL POST BY GENRE
router.get("/getbygenre", postController.getallbygenre);
//GET ALL PUBLISH POST BY USER
router.get("/getallpublishbyuser", verifyToken, postController.getallpublishbyuser);
//GET ALL WRITING POST BY USER
router.get("/getallwritingbyuser", verifyToken, postController.getallwritingbyuser);
//GET ALL HIDEN POST BY USER
router.get("/getallhiddenbyuser", verifyToken, postController.getallhiddenbyuser);
//GET POPULAR POST
router.get("/getpopular", postController.getpopular);
//SAVE POST
router.put("/update/:id", verifyToken, postController.update);
//LIKE POST
router.put("/like/:id", verifyToken, postController.like);
//LIKE COUNT
router.get("/likecount/:id", postController.likecount);
//GET MOST LIKE POST
router.get("/getmostlike", postController.getmostlike);
//GET NEW POST
router.get("/getnew", postController.getnew);

module.exports = router;