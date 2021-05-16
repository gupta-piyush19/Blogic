import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import "./BlogItem.css";
import BlogContext from "../../context/blog/blogContext";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const history = useHistory();
  const { blogs, getAllBlogs, likeBlog, unLikeBlog, loading } =
    useContext(BlogContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    // props.location.state ? state.blogs : getAllBlogs();
    window.scrollTo(0, 0);
    if (!blogs || blogs.length == 0) {
      getAllBlogs();
    }
  }, []);

  const redirectHandler = (id) => {
    history.push({
      pathname: "/blogs/user",
      search: `id=${id}`,
    });
  };

  const viewHandler = (blog) => {
    history.push({
      pathname: "blogs/view",
      search: `id=${blog._id}`,
      // state: { editorState: blog.body },
    });
  };
  const getDate = (date) => {
    const blogDate = new Date(date);
    return (
      <p>
        {months[blogDate.getMonth()]} {blogDate.getDate()}
      </p>
    );
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div className="container flex" style={{ marginTop: "2rem" }}>
          {blogs &&
            blogs.map((blog) => (
              <div className="blog-item" key={blog._id}>
                <div className="blog-item-content">
                  <div className="info">
                    <div onClick={() => viewHandler(blog)}>
                      <h1>{blog.title}</h1>
                    </div>
                    <div className="blog-date">{getDate(blog.createdAt)}</div>
                    <div className="blog-author">
                      By{" "}
                      <span onClick={() => redirectHandler(blog.owner._id)}>
                        {blog.owner.name}
                      </span>{" "}
                    </div>
                    <button
                      onClick={() => viewHandler(blog)}
                      className="read-more-btn"
                    >
                      Read More <FontAwesomeIcon icon={faArrowRight} />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <div className="like_comp">
                      <button className="like-btn">
                        {isAuthenticated && user ? (
                          blog.likes.indexOf(user._id) !== -1 ? (
                            <i
                              class="fas fa-heart filled"
                              onClick={() => unLikeBlog(blog._id, user._id)}
                            ></i>
                          ) : (
                            <i
                              class="fas fa-heart"
                              onClick={() => likeBlog(blog._id, user._id)}
                            ></i>
                          )
                        ) : (
                          <i class="fas fa-heart"></i>
                        )}
                      </button>
                      <span className="like-cnt">{blog.likes.length}</span>
                    </div>
                  </div>
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${blog.image})` }}
                    onClick={() => viewHandler(blog)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default Home;
