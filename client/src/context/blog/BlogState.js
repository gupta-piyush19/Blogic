import React, { useReducer } from "react";
import BlogContext from "./blogContext";
import blogReducer from "./blogReducer";
import axios from "axios";

import {
  CREATE_BLOG,
  GET_ALL_BLOGS,
  GET_BLOG,
  GET_BLOGS_BY_USER,
  UPDATE_BLOG,
  DELETE_BLOG,
  BLOG_ERROR,
} from "../types";

const BlogState = (props) => {
  const initialState = {
    blogs: [],
    blog: null,
    blogsByUser: [],
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const createBlog = async (blog) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/blogs", blog, config);
      dispatch({
        type: CREATE_BLOG,
        payload: res.data.data.blog,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getAllBlogs = async () => {
    try {
      const blogs = await axios.get("/api/blogs");
      dispatch({
        type: GET_ALL_BLOGS,
        payload: blogs.data.data.blogs,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getBlog = async (id) => {
    try {
      const blogs = await axios.get(`/api/blogs/${id}`);
      dispatch({
        type: GET_BLOG,
        payload: blogs.data.data,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: state.blogs,
        blog: state.blog,
        blogsByUser: state.blogsByUser,
        loading: state.loading,
        error: state.error,
        createBlog,
        getBlog,
        getAllBlogs,
        // getAllBlogsByUser,
        // updateBlog,
        // deleteBlog,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
