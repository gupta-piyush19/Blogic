const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogByUser,
} = require("../controllers/blogController");

const { protect } = require("../middlewares/authMiddleware");

// @desc    Get all Blogs
// @route   GET /api/blogs
// @access  public
router.get("/", getAllBlogs);

// @desc    Get Blog by Id
// @route   GET /api/blogs/:blogId
// @access  public
router.get("/:blogId", getBlogById);

// @desc    Create a Blog
// @route   POST /api/blogs
// @access  private isLoggedIn,
router.post("/", protect, createBlog);

// @desc    Update Blog
// @route   PATCH /api/blogs/:blogId
// @access  private  isLoggedIn, isOwner,
router.patch("/:blogId", protect, updateBlog);

// @desc    Delete a Blog
// @route   DELETE /api/blogs/blogId
// @access  private  isLoggedIn, isOwner,
router.delete("/:blogId", protect, deleteBlog);

// @desc    Get all Blogs by a particular User
// @route   GET /api/blogs/user/:userId
// @access  public
router.get("/user/:userId", getAllBlogByUser);

module.exports = router;
