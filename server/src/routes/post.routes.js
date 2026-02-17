import { Router } from "express";
import {
  createPost,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyJwt);


router.route("/")
  .post(upload.single("image"), createPost)
  .get(getMyPosts); 


router.route("/:id")
  .get(getPostById)
  .put(upload.single("image"), updatePost)
  .delete(deletePost);

export default router;
