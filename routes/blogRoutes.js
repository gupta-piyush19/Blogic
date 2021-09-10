const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  getAllBlogByUser,
} = require("../controllers/blogController");
const { protect, isOwner } = require("../middlewares/authMiddleware");
const multer = require("multer");
const fs = require("fs");

// @desc    Get all Blogs
// @route   GET /api/blogs
// @access  public
router.get("/", getAllBlogs);

// @desc    Get Blog by Id
// @route   GET /api/blogs/:blogId
// @access  public
router.get("/:blogId", getBlogById);

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   fs.mkdir("./uploads/", (err) => {
  //     cb(null, "./uploads/");
  //   });
  // },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

// @desc    Create a Blog
// @route   POST /api/blogs
// @access  private
router.post("/", protect, upload.single("image"), createBlog);

// @desc    Update Blog
// @route   PATCH /api/blogs/:blogId
// @access  private
router.patch("/:blogId", protect, isOwner, upload.single("image"), updateBlog);

// @desc    Delete a Blog
// @route   DELETE /api/blogs/:blogId
// @access  private
router.delete("/:blogId", protect, isOwner, deleteBlog);

// @desc    Like a Blog
// @route   POST /api/blogs/like/:blogID
// @access  private
router.post("/like/:blogId", protect, likeBlog);

// @desc    Unlike a Blog
// @route   POST /api/blogs/unlike/:blogId
// @access  private
router.post("/unlike/:blogId", protect, unlikeBlog);

// @desc    Get all Blogs by a particular User
// @route   GET /api/blogs/by/:userId
// @access  public
router.get("/by/:userId", getAllBlogByUser);

module.exports = router;
