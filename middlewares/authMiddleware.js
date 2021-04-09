const jwt = require("jsonwebtoken");

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
