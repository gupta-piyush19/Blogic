const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// @desc    Get User from token(is logged in)
// @route   GET /api/auth
// @access  public , protect, isLoggedIn
// router.get("/" )

// @desc    Login User
// @route   POST /api/auth/login
// @access  public
router.post("/login", login);

// @desc    Register new User
// @route   POST /api/auth/register
// @access  public
router.post("/register", register);

module.exports = router;
