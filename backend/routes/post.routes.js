
import { Router } from "express";
import { activeCheck, commentPost, createPost, delete_comment_of_user, deletePost, get_comments_by_post, getAllPosts, increment_like} from "../controllers/posts.controller.js";
import multer from "multer";
// import React from "react";
// import { createRef } from "react";

const router=Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})
const upload = multer({ storage: storage });

// router.route("/update_profile_picture")
// .post(upload.single('profile_picture'),uploadProfilePicture)


router.route('/').get(activeCheck);

router.route("/post").post(upload.single('media'),createPost);
router.route("/posts").get(getAllPosts)
router.route("/delete_post").post(deletePost);
router.route("/comment").post(commentPost);
router.route("/get_comments").get(get_comments_by_post);
router.route("/delete_comment").delete(delete_comment_of_user);
router.route("/increment_post_like").post(increment_like)

export default router;