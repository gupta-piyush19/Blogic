const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");

// Allow only if user is logged-in
exports.protect = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User does not exist",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.isOwner = async (req, res, next) => {
  const { userId, blogId } = req.params;
  if (userId) {
    if (!(req.user._id == userId)) {
      return res.status(400).json({
        status: "fail",
        message: "You are not authorised to perform this action.",
      });
    }
    next();
  } else if (blogId) {
    try {
      const blog = await Blog.findById(blogId);
      if (!blog.owner.equals(req.user._id)) {
        return res.status(400).json({
          status: "fail",
          message: "You are not authorised to perform this action.",
        });
      }
      next();
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
};
