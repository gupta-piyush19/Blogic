const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

// @desc    Get All Users
// @route   GET /api/users/
// @access  public
router.get("/", getAllUsers);

// @desc    Get User
// @route   GET /api/users/:userId
// @access  public
router.get("/:userId", getUserById);

// @desc    Update User
// @route   PATCH /api/users/:userId
// @access  public
router.patch("/:userId", protect, updateUser);

// @desc    Delete User
// @route   DELETE /api/users/:userId
// @access  public
router.delete("/:userId", protect, deleteUser);

module.exports = router;
