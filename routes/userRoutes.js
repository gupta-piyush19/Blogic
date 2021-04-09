const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, isOwner } = require("../middlewares/authMiddleware");

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
// @access  private
router.patch("/:userId", protect, isOwner, updateUser);

// @desc    Delete User
// @route   DELETE /api/users/:userId
// @access  private
router.delete("/:userId", protect, isOwner, deleteUser);

module.exports = router;
