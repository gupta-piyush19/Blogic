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

const EditEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { isAuthenticated } = useContext(AuthContext);

  //   useEffect(() => {}, []);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  return (
    <div className="container">
      {!isAuthenticated && <h1>You need to be logged in to visit this page</h1>}

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
};

export default EditEditor;
