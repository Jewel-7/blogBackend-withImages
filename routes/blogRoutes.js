const express = require("express");
const {
  findBlog,
  createBlog,
  findUniqueBlog,
  updateUniqueBlog,
  updateImageById,
  deleteBlog,
} = require("../controllers/taskControllers");

const router = express.Router();

router.route("/create").post(createBlog);
router.route("/find").get(findBlog);
router.route("/finduni/:_id").get(findUniqueBlog);
router.route("/updateimg/:_id").post(updateImageById);
router.route("/update/:_id").post(updateUniqueBlog);
router.route("/delete/:_id").post(deleteBlog);

module.exports = router;
