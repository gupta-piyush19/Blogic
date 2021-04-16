import React, { useContext, useEffect, useState } from "react";
import { Editor, convertFromRaw, EditorState } from "draft-js";
import BlogContext from "../../context/blog/blogContext";
import AuthContext from "../../context/auth/authContext";

const ViewEditor = (props) => {
  const { blog, getBlog, deleteBlog, clearBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(async () => {
    clearBlog();
    const queryParams = new URLSearchParams(props.location.search);
    let idCopy;
    for (let param of queryParams.entries()) {
      if (param[0] === "id") {
        idCopy = param[1];
      }
    }
    const blog1 = await getBlog(idCopy);
    const body = JSON.parse(blog1.body);
    const data = convertFromRaw(body);
    setEditorState(EditorState.createWithContent(data));
  }, []);

  const deleteHandler = (id) => {
    deleteBlog(id);

    props.history.push({
      pathname: "/",
    });
  };
  return (
    blog && (
      <div className="container">
        <h1>{blog.title}</h1>
        {/* <div className="editor-wrapper"> */}
        {/* <div className="editor-container"> */}
        <Editor readOnly editorState={editorState} />
        {user && blog.owner === user._id && (
          <button onClick={() => deleteHandler(blog._id)}>Delete Blog</button>
        )}
      </div>
      // </div>
      // </div>
    )
  );
};

export default ViewEditor;
