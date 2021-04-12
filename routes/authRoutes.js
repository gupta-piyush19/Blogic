const express = require("express");
const router = express.Router();
const {
  register,
  login,
  sendCurrentUser,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// @desc    Get Current User
// @route   GET /api/auth
// @access  protect, isLoggedIn
router.get("/", protect, sendCurrentUser);

// @desc    Login User
// @route   POST /api/auth/login
// @access  public
router.post("/login", login);

// @desc    Register new User
// @route   POST /api/auth/register
// @access  public
router.post("/register", register);

module.exports = router;
