const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

// Allow only if user is logged-in
exports.protect = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
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
    console.log(userId, req.user.id);
    console.log(typeof userId, typeof req.user.id);
    if (!(req.user.id == userId)) {
      return res.status(400).json({
        status: "fail",
        message: "You are not authorised to perform this action.",
      });
    }
    next();
  } else if (blogId) {
    try {
      const blog = await Blog.findById(blogId);
      if (!blog.owner.equals(req.user.id)) {
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
