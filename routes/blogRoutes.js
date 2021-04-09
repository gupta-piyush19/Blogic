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

const { protect, isOwner } = require("../middlewares/authMiddleware");

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
// @access  private
router.post("/", protect, createBlog);

// @desc    Update Blog
// @route   PATCH /api/blogs/:blogId
// @access  private
router.patch("/:blogId", protect, isOwner, updateBlog);

// @desc    Delete a Blog
// @route   DELETE /api/blogs/:blogId
// @access  private
router.delete("/:blogId", protect, isOwner, deleteBlog);

// @desc    Get all Blogs by a particular User
// @route   GET /api/blogs/by/:userId
// @access  public
router.get("/by/:userId", getAllBlogByUser);

module.exports = router;
