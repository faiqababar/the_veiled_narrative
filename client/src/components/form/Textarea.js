import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import renderHtml from "react-render-html";
import "../posts/post.scss";

const Quill = ReactQuill.Quill;
let fonts = Quill.import("attributors/style/font");
fonts.whitelist = [
  "sans-serif",
  "serif",
  "monospace",
  "verdana",
  "arial",
  "courier",
  "garamond",
  "tahoma",
];
Quill.register(fonts, true);

const Textarea = ({ name, placeholder, value, onChange, onBlur, text }) => {
  return (
    <Form.Group controlId={text.module + name}>
      <ReactQuill
        className="quillEditor"
        theme="snow"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        modules={Textarea.modules}
        formats={Textarea.formats}
      />
      <Form.Text style={{ color: "red" }}>{text.error}</Form.Text>
    </Form.Group>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Textarea.modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      {
        font: [
          "",
          "arial",
          "courier",
          "garamond",
          "monospace",
          "sans-serif",
          "serif",
          "tahoma",
          "verdana",
        ],
      },
    ],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Textarea.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export default Textarea;
