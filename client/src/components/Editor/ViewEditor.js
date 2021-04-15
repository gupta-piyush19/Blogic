import React, { useState } from "react";
import { Editor, convertFromRaw, EditorState } from "draft-js";

const ViewEditor = (props) => {
  const body = JSON.parse(props.location.state.editorState);
  const data = convertFromRaw(body);
  const [editorState] = useState(EditorState.createWithContent(data));

  return (
    <div className="container">
      <div className="editor-wrapper">
        <div className="editor-container">
          <Editor readOnly editorState={editorState} />
        </div>
      </div>
    </div>
  );
};

export default ViewEditor;
