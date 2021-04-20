import React, { useContext, useEffect, useState } from "react";
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

const EditEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { user, isAuthenticated } = useContext(AuthContext);
  const { blog, loading, getBlog } = useContext(BlogContext);

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
        {isAuthenticated && (
          <>
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
          </>
        )}
      </div>
    );
  }
};

export default EditEditor;
