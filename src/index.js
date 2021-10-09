import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main";
import "antd/dist/antd.css";
import ImageUploader from "./service/image_uploader";
// import { MyProvider } from "./service/context";
const imageUploader = new ImageUploader();

ReactDOM.render(
  // <React.StrictMode>
  // <MyProvider>
  <Main imageUploader={imageUploader} />,
  // </MyProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
