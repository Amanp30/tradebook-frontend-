import React from "react";
import ReactQuill, { Quill } from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
  imageDrop: {}, // Make sure to add this!!!
  imageResize: {
    parchment: Quill.import("parchment"),
    displaySize: true,
    // maxSize: [500, 500],
    // height: 400, // add this line to set the height of the image resize module
  },
};

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

function Editor({ value, setValue }) {
  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setValue(editor.getHTML());
  };

  //   const sanitizedValue = DOMPurify.sanitize(value).replace(/&nbsp;/g, " ");
  const sanitizedValue = DOMPurify.sanitize(value);

  return (
    <ReactQuill
      //   style={{ height: "300px" }}
      theme="snow"
      modules={modules}
      formats={formats}
      value={sanitizedValue}
      onChange={handleChange}
      dangerouslySetInnerHTML={{ __html: sanitizedValue }}
    />
  );
}

export default Editor;
