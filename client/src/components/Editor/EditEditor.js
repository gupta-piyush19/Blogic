import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Toolbar from "./Toolbar/Toolbar";
import { styleMap, myBlockStyleFn } from "./editorStyles";
import "./DraftEditor.css";

import AuthContext from "../../context/auth/authContext";
import BlogContext from "../../context/blog/blogContext";
import AlertContext from "../../context/alert/alertContext";

import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";

import "./EditEditor.css";

const EditEditor = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { blog, loading, getBlog, updateBlog } = useContext(BlogContext);
  const { setAlert } = useContext(AlertContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const preview = useRef("");
  const uploadButton = useRef("");

  useEffect(async () => {
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
    setTitle(blog1.title);
    setImage(blog1.image);
  }, []);

  const uploadImage = () => {
    uploadButton.current.click();
  };
  const previewImage = (image) => {
    preview.current.style.display = "";
    const imageUrl = URL.createObjectURL(image);
    preview.current.src = imageUrl;
  };

  const handleImage = () => {
    preview.current.style.display = "none";
    preview.current.src = "";
    setImage("");
  };

  const updateHandler = (id) => {
    if (title === "" || image === "") {
      setAlert("Please fill all the fields", "warning");
    } else {
      const contentState = editorState.getCurrentContent();
      const body = JSON.stringify(convertToRaw(contentState));
      updateBlog(id, {
        title,
        image,
        body,
      });
      props.history.push("/");
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  if (loading) {
    return <Spinner />;
  } else if (!loading && !isAuthenticated) {
    return (
      <div className="container">
        <h1>You need to be logged in to visit this page</h1>
      </div>
    );
  } else if (blog && user && user._id !== blog.owner._id) {
    setTimeout(() => props.history.push("/"), 3000);
    return (
      <div className="container">
        <h1>You are not allowed to edit someone else's Blog!</h1>
        <p>You will be redirected to homepage in 3s</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="edit-blog">
          <Alert />
          <div className="edit-blog-header">
            <input
              type="text"
              name="title"
              className="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>
              {!image && (
                <>
                  <input
                    type="button"
                    className="button"
                    value="+"
                    onClick={uploadImage}
                  />
                  <input
                    type="file"
                    name="image button"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={uploadButton}
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      previewImage(e.target.files[0]);
                    }}
                  />
                </>
              )}
              <div className="img">
                <img src={blog.image} ref={preview} />
                {image && (
                  <button className="cancel-btn" onClick={handleImage}>
                    ✖
                  </button>
                )}
              </div>
            </span>
          </div>
          <div className="editor-wrapper">
            <Toolbar
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <div className="editor-container">
              <Editor
                handleKeyCommand={handleKeyCommand}
                editorState={editorState}
                customStyleMap={styleMap}
                blockStyleFn={myBlockStyleFn}
                onChange={(editorState) => setEditorState(editorState)}
              />
            </div>
          </div>
          <button
            className="update-btn btn"
            onClick={() => updateHandler(blog._id)}
          >
            Update Blog📝
          </button>
        </div>
      </div>
    );
  }
};

export default EditEditor;
