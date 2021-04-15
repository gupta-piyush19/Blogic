import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import BlogContext from "../context/blog/blogContext";

const Home = () => {
  const history = useHistory();
  const { blogs, getAllBlogs } = useContext(BlogContext);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const viewHandler = (blog) => {
    console.log(blog);
    history.push({
      pathname: "/view",
      search: `id=${blog._id}`,
      state: { editorState: blog.body },
    });
  };
  return (
    <div>
      <h1> BLOGIC APP</h1>
      {console.log(blogs)}
      {blogs &&
        blogs.map((blog) => (
          <div onClick={() => viewHandler(blog)}>
            <h1>{blog.title}</h1>
          </div>
        ))}
    </div>
  );
};

export default Home;
