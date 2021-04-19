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
  CLEAR_BLOG,
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
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("body", blog.body);
    formData.append("image", blog.image);
    try {
      const res = await axios.post("/api/blogs", formData, config);
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
      const res = await axios.get(`/api/blogs/${id}`);
      dispatch({
        type: GET_BLOG,
        payload: res.data.data.blog,
      });
      return res.data.data.blog;
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getAllBlogsByUser = async (id) => {
    try {
      const res = await axios.get(`/api/blogs/by/${id}`);
      dispatch({
        type: GET_BLOGS_BY_USER,
        payload: res.data.data.blogs,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      dispatch({ type: DELETE_BLOG });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const clearBlog = () => {
    dispatch({ type: CLEAR_BLOG });
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
        getAllBlogsByUser,
        // updateBlog,
        deleteBlog,
        clearBlog,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
