import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main";
import "antd/dist/antd.css";
import ImageUploader from "./image_uploader";
const imageUploader = new ImageUploader();

ReactDOM.render(
  // <React.StrictMode>
  <Main imageUploader={imageUploader} />,
  // </React.StrictMode>,
  document.getElementById("root")
);
