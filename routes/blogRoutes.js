const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

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
router.post("/", createBlog);

// @desc    Update Blog
// @route   PATCH /api/blogs/:blogId
// @access  private  isLoggedIn, isOwner,
router.patch("/:blogId", updateBlog);

// @desc    Delete a Blog
// @route   DELETE /api/blogs/blogId
// @access  private  isLoggedIn, isOwner,
router.delete("/:blogId", deleteBlog);

// @desc    Get all Blogs by a particular User
// @route   GET /api/blogs/user/
// @access  public
// router.get("/user/:userId", getAllBlogByUserId);

module.exports = router;