// FOR INLINE STYLES
export const styleMap = {
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
export const myBlockStyleFn = (contentBlock) => {
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
