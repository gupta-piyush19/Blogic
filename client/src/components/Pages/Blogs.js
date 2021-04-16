import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import BlogContext from "../../context/blog/blogContext";

const Blogs = () => {
  const history = useHistory();
  const { blogs, getAllBlogs } = useContext(BlogContext);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const viewHandler = (blog) => {
    history.push({
      pathname: "/view",
      search: `id=${blog._id}`,
      // state: { editorState: blog.body },
    });
  };
  return (
    <div>
      <h1> BLOGIC APP</h1>
      {console.log(blogs)}
      {blogs &&
        blogs.map((blog) => (
          <div className="blogItem" key={blog._id}>
            <img src={blog.image} alt="" />
            <div className="info">
              <h1>{blog.title}</h1>
              <button onClick={() => viewHandler(blog)}>Read more</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
