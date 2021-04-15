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

const DraftEditor = (props) => {
  const history = useHistory();
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

  // FOR INLINE STYLES
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: " 0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
    // FONT80: {
    //   fontSize: "80px",
    // },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default:
        break;
    }
  };

  const saveHandler = () => {
    const contentState = editorState.getCurrentContent();
    createBlog({
      title,
      image,
      body: JSON.stringify(convertToRaw(contentState)),
    });
  };

  const viewHandler = () => {
    const contentState = editorState.getCurrentContent();
    const data = JSON.stringify(convertToRaw(contentState));
    history.push({
      pathname: "/view",
      state: { editorState: data },
    });
  };
  return (
    <div className="container">
      <div className="title-input ">
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Enter Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div
        className="editor-wrapper"
        // onClick={focusEditor} preparing for font size feature(DropDown)
      >
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
        <div className="editor-container">
          <Editor
            ref={editor}
            // readOnly
            placeholder="Write Here"
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
            onChange={(editorState) => {
              const contentState = editorState.getCurrentContent();
              console.log(convertToRaw(contentState));
              setEditorState(editorState);
            }}
          />
        </div>
        <button onClick={viewHandler}>View Blog</button>
        <button onClick={saveHandler}>Save Blog</button>
      </div>
    </div>
  );
};

export default DraftEditor;
