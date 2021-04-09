const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

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
router.patch("/:userId", updateUser);

// @desc    Delete User
// @route   DELETE /api/users/:userId
// @access  public
router.delete("/:userId", deleteUser);

module.exports = router;
