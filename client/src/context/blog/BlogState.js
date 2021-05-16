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
  SET_LOADING,
  LIKE_BLOG,
  UNLIKE_BLOG,
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

  const createBlog = async (blog, currUser) => {
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
        payload: { ...res.data.data.blog, owner: currUser },
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getAllBlogs = async () => {
    setLoading();
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
    setLoading();

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
    setLoading();

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

  const updateBlog = async (id, blog) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("image", blog.image);
    formData.append("body", blog.body);
    try {
      const res = await axios.patch(`/api/blogs/${id}`, formData, config);
      dispatch({
        type: UPDATE_BLOG,
        payload: res.data.data.blog,
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
      dispatch({ type: DELETE_BLOG, payload: id });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const likeBlog = async (blogId, userId) => {
    try {
      axios.post(`/api/blogs/like/${blogId}`);
      dispatch({ type: LIKE_BLOG, payload: { blogId, userId } });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const unLikeBlog = async (blogId, userId) => {
    try {
      axios.post(`/api/blogs/unlike/${blogId}`);
      dispatch({ type: UNLIKE_BLOG, payload: { blogId, userId } });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
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
        updateBlog,
        deleteBlog,
        likeBlog,
        unLikeBlog,
        clearBlog,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
