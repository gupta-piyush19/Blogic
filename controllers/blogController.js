const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("owner");
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate("owner");
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog does not exist",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      image: req.file.path.replace(/\\/g, "/"),
      owner: req.user._id,
    });
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      {
        ...req.body,
        image: req.file.path.replace(/\\/g, "/"),
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.blogId);

    res.status(200).json({
      status: "success",
      message: "Blog Successfully Deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllBlogByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ owner: req.params.userId }).populate(
      "owner"
    );
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
