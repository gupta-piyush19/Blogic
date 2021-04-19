import React, { useContext, useEffect, useState } from "react";
import { Editor, convertFromRaw, EditorState } from "draft-js";
import BlogContext from "../../context/blog/blogContext";
import AuthContext from "../../context/auth/authContext";
import { styleMap, myBlockStyleFn } from "./editorStyles";
import "./viewEditor.css";

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

  const editHandler = (id) => {
    props.history.push({
      pathname: "/blogs/edit",
      search: `id=${id}`,
    });
  };

  const deleteHandler = (id) => {
    deleteBlog(id);
    props.history.push({
      pathname: "/blogs/delete",
      search: `id=${id}`,
    });
  };

  return (
    blog && (
      <div className="view-blog">
        <div className="container">
          <h1 class="blogTitle">{blog.title}</h1>
          <img src={blog.image} />
          <div className="editor">
            <Editor
              readOnly
              editorState={editorState}
              customStyleMap={styleMap}
              blockStyleFn={myBlockStyleFn}
            />
          </div>
          {user && blog.owner._id === user._id && (
            <div className="buttons">
              <button
                className="edit-btn btn"
                onClick={() => editHandler(blog._id)}
              >
                Edit Blog
              </button>
              <button
                className="delete-btn btn"
                onClick={() => deleteHandler(blog._id)}
              >
                Delete Blog
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ViewEditor;
