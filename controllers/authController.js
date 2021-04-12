const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.sendCurrentUser = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        status: "success",
        data: { user: req.user },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "You are not logged in",
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both email and password.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: "fail",
        message: "Password should be more than 8 characters long",
      });
    }

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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide an email and a password.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User does not exists",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid Credentials",
      });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      status: "success",
      data: { token },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
