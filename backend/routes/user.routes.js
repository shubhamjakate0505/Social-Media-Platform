
import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller.js";
import { getUserAndProfile, login, register } from "../controllers/user.controller.js";
import multer from "multer";
import { uploadProfilePicture } from "../controllers/user.controller.js";
import {updateUserProfile,updateProfileData,getAllUserProfile,downloadProfile} from "../controllers/user.controller.js";



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
{
  "p"
}

router.route("/update_profile_picture")
.post(upload.single('profile_picture'),uploadProfilePicture)


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update_profile').post(updateUserProfile);
router.route('/get_user_and_profile').get(getUserAndProfile)
router.route('/update_profile_data').post(updateProfileData);
router.route('/user/get_all_users').get(getAllUserProfile);
router.route('/user/download_resume').get(downloadProfile);

export default router;