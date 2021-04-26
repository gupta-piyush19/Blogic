import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Toolbar from "./Toolbar/Toolbar";
import BlogContext from "../../context/blog/blogContext";
import "./DraftEditor.css";
import { useHistory } from "react-router";
import { styleMap, myBlockStyleFn } from "./editorStyles";

const DraftEditor = (props) => {
  const history = useHistory();

  const imagePreview = useRef(null);
  const imageInput = useRef(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            key: "3eesq",
            text: "A Text-editor with super cool features built in Draft.js.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 19,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 25,
                length: 5,
                style: "ITALIC",
              },
              {
                offset: 30,
                length: 8,
                style: "UNDERLINE",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "9adb5",
            text: "Tell us a story!",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      })
    )
  );
  const editor = useRef(null);
  const { createBlog } = useContext(BlogContext);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const uploadImage = () => {
    imageInput.current.click();
  };

  const preview = (image) => {
    const imageURL = URL.createObjectURL(image);
    imagePreview.current.src = imageURL;
  };

  const clearImage = () => {
    imagePreview.current.src = "";
    setImage("");
  };

  const saveHandler = () => {
    const contentState = editorState.getCurrentContent();
    createBlog({
      title,
      image,
      body: JSON.stringify(convertToRaw(contentState)),
    });
    history.push({
      pathname: "/",
    });
  };

  return (
    <div className="container">
      <div className="create-blog my-3">
        <div className="create-blog-header">
          <span>
            {!image && (
              <input
                type="button"
                className="button"
                value="+"
                onClick={uploadImage}
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              ref={imageInput}
              placeholder="Enter Image"
              onChange={(e) => {
                setImage(e.target.files[0]);
                preview(e.target.files[0]);
              }}
            />
            <img src="" ref={imagePreview} />
            {image && (
              <button className="cancel-btn" onClick={clearImage}>
                ✖
              </button>
            )}
          </span>
          <input
            type="text"
            name="title"
            className="title"
            placeholder="Enter Title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div
          className="editor-wrapper"
          // onClick={focusEditor} preparing for font size feature(DropDown)
        >
          <Toolbar editorState={editorState} setEditorState={setEditorState} />
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
              ref={editor}
              // readOnly
              placeholder="Write Here"
              handleKeyCommand={handleKeyCommand}
              editorState={editorState}
              customStyleMap={styleMap}
              blockStyleFn={myBlockStyleFn}
              onChange={(editorState) => setEditorState(editorState)}
            />
          </div>
        </div>
        <button className="save-btn" onClick={saveHandler}>
          Save Blog💾
        </button>
      </div>
    </div>
  );
};

export default DraftEditor;
