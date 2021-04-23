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
  // const uploadButton = useRef(null);

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
    <div className="view">
      <div className="container">
        <div className="my-3">
          <div className="image">
            {!image && (
              <input
                type="button"
                className="button"
                value="+"
                // ref={uploadButton}
                onClick={uploadImage}
              />
            )}
            <div
              className="preview-div"
              style={{
                position: "relative",
                width: "70%",
                margin: "2rem auto",
              }}
            >
              <img src="" ref={imagePreview} />
              {image && (
                <span onClick={clearImage} className="deletebtn">
                  ❌
                </span>
              )}
            </div>
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
          </div>
          <input
            type="text"
            name="title"
            className="title"
            placeholder="Enter Title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div
            className="editor-wrapper"
            // onClick={focusEditor} preparing for font size feature(DropDown)
          >
            <Toolbar
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <div className="editor-container">
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
    </div>
  );
};

export default DraftEditor;
