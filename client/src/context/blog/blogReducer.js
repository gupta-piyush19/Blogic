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
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
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
        blog: action.payload,
        loading: false,
      };
    case CLEAR_BLOG:
    case DELETE_BLOG: {
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
    default:
      return state;
  }
};
