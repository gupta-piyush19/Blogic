const Blog = require("../models/Blog");
const fs = require("fs");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("owner").sort({ createdAt: -1 });
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
    let updatedBlog;
    if (req.file) {
      const updatingBlog = await Blog.findById(req.params.blogId);
      if (!updatingBlog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog does not exist",
        });
      }
      await fs.unlink(`./${updatingBlog.image}`, (err) => {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });

      updatedBlog = {
        ...req.body,
        image: req.file.path.replace(/\\/g, "/"),
      };
    } else {
      updatedBlog = {
        ...req.body,
      };
    }
    const blog = await Blog.findByIdAndUpdate(req.params.blogId, updatedBlog, {
      new: true,
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

exports.deleteBlog = async (req, res) => {
  try {
    const deletingBlog = await Blog.findById(req.params.blogId);
    if (!deletingBlog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog does not exist",
      });
    }
    await fs.unlink(`./${deletingBlog.image}`, (err) => {
      if (err && err.code == "ENOENT") {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });

    deletingBlog.delete();

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
