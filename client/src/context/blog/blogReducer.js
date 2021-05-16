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

export default (state, action) => {
  switch (action.type) {
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false,
      };
    case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
      };
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case GET_BLOGS_BY_USER:
      return {
        ...state,
        blogsByUser: action.payload,
        loading: false,
      };
    case UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id
            ? { ...action.payload, owner: blog.owner }
            : blog
        ),
        blog: action.payload,
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        blog: null,
      };
    case CLEAR_BLOG: {
      return {
        ...state,
        blogs: [],
        blog: null,
        error: null,
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: true,
      };
    case LIKE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload.blogId
            ? {
                ...blog,
                likes: [...blog.likes, action.payload.userId],
              }
            : blog
        ),
      };
    case UNLIKE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload.blogId
            ? {
                ...blog,
                likes: blog.likes.filter(
                  (likeUserId) => likeUserId !== action.payload.userId
                ),
              }
            : blog
        ),
      };
    default:
      return state;
  }
};
