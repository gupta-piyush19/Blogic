import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Toolbar from "./Toolbar/Toolbar";
import "./DraftEditor.css";
import { styleMap, myBlockStyleFn, handleKeyCommand } from "./editorStyles";
import AuthContext from "../../context/auth/authContext";
import BlogContext from "../../context/blog/blogContext";
import Spinner from "../layout/Spinner";
import "./EditEditor.css";

const EditEditor = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { user, isAuthenticated } = useContext(AuthContext);
  const { blog, loading, getBlog } = useContext(BlogContext);

  const preview = useRef("");
  const uploadButton = useRef("");

  const uploadImage = () => {
    uploadButton.current.click();
  };
  const previewImage = (image) => {
    const imageUrl = URL.createObjectURL(image);
    preview.current.src = imageUrl;
  };

  const handleImage = () => {
    preview.current.src = "";
    setImage("");
  };

  const updateHandler = () => {};

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
    // user._id !== blog.owner._id
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

              <img src={blog.image} ref={preview} />
              {image && (
                <button className="cancel-btn" onClick={handleImage}>
                  ✖
                </button>
              )}
            </span>
          </div>
          <div className="editor-wrapper">
            <Toolbar
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <div
              className="editor-container"
              style={{
                fontFamily:
                  '"charter", "Georgia", "Cambria", "Times New Roman", "Times", "serif"',
                lineHeight: 2,
                fontSize: "18px",
              }}
            >
              <Editor
                handleKeyCommand={handleKeyCommand}
                editorState={editorState}
                customStyleMap={styleMap}
                blockStyleFn={myBlockStyleFn}
                onChange={(editorState) => setEditorState(editorState)}
              />
            </div>
          </div>
          <button className="update-btn btn" onClick={updateHandler}>
            Update Blog📝
          </button>
        </div>
      </div>
    );
  }
};

export default EditEditor;
