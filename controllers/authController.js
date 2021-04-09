const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(201).json({ status: "success", data: { token } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
