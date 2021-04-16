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
  return (
    blog && (
      <div className="container">
        <h1>{blog.title}</h1>
        {/* <div className="editor-wrapper"> */}
        {/* <div className="editor-container"> */}
        <Editor
          readOnly
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
        />
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
