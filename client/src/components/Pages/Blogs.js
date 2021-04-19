import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import BlogContext from "../../context/blog/blogContext";

const Blogs = () => {
  const history = useHistory();
  const { blogs, getAllBlogs } = useContext(BlogContext);
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
    getAllBlogs();
  }, []);

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
  return (
    <div>
      <div className="container flex" style={{ marginTop: "2rem" }}>
        {blogs &&
          blogs.map((blog) => (
            <div className="blogItem" key={blog._id}>
              <div className="info">
                <p>
                  <Link to="/blogs/by">{blog.owner.name}</Link> wrote,
                </p>
                <div onClick={() => viewHandler(blog)}>
                  <h1>{blog.title}</h1>
                  {getDate(blog.createdAt)}
                </div>
              </div>
              <img src={blog.image} alt="" onClick={() => viewHandler(blog)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;