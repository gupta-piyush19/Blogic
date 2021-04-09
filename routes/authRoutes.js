const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

// @desc    Get User from token(is logged in)
// @route   GET /api/auth
// @access  public , protect, isLoggedIn
// router.get("/" )

// @desc    Get all Blogs
// @route   GET /api/auth
// @access  public
// router.post("/login", login);

// @desc    Register new User
// @route   GET /api/auth/register
// @access  public
router.post("/register", register);

// GET /api/auth/       pass: token(Header),
// POST /api/login
// POST /api/singup

module.exports = router;
