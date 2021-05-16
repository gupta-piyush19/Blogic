import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import BlogContext from "../../context/blog/blogContext";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const UserBlogs = (props) => {
  const history = useHistory();
  const { blogsByUser, loading, getAllBlogsByUser } = useContext(BlogContext);
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
    const queryParams = new URLSearchParams(props.location.search);
    let idCopy;
    for (let param of queryParams.entries()) {
      if (param[0] === "id") {
        idCopy = param[1];
      }
    }
    getAllBlogsByUser(idCopy);
  }, []);

  const viewHandler = (blog) => {
    history.push({
      pathname: "/blogs/view",
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
          {blogsByUser &&
            blogsByUser.map((blog) => (
              <div className="blog-item" key={blog._id}>
                <div className="blog-item-content">
                  <div className="info">
                    <div onClick={() => viewHandler(blog)}>
                      <h1>{blog.title}</h1>
                    </div>
                    <div>{getDate(blog.createdAt)}</div>
                    <button
                      onClick={() => viewHandler(blog)}
                      className="read-more-btn"
                    >
                      Read More <FontAwesomeIcon icon={faArrowRight} />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
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

export default UserBlogs;
