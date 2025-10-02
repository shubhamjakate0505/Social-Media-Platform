
import { Router } from "express";
import { activeCheck, createPost} from "../controllers/posts.controller.js";
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

export default router;