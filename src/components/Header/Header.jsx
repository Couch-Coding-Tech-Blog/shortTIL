import React, { useState } from "react";
import { Layout, Button, Input, Select } from "antd";
import CreateForm from "../ModalForm/CreateForm";
import "antd/dist/antd.css";
import "./style.scss";

const { Header } = Layout;
const { Search } = Input;

const Navbar = ({ onAdd, imageUploader }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onCreate = (values) => {
    const today = new Date();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const date = `0${today.getDate()}`.slice(-2);
    const newPost = {
      id: Date.now(),
      title: values.title,
      author: "anonymous",
      published_at: `${today.getFullYear()}-${month}-${date}`,
      body: values.content,
      tags: values.tags || null,
      uploaded_images: values.images || null,
    };
    console.log(newPost);
    onAdd(newPost);
    setVisible(false);
  };

  return (
    <div className="header">
      <h3 className="shape"><span></span><span></span></h3>
      <a href="https://github.com/Couch-Coding-Tech-Blog/tech-blog" target="_blank">
        <img src="https://user-images.githubusercontent.com/51474234/136360542-c3ba285d-7758-481d-9b5b-a466ffb5e59c.png" alt="stack icon" />
      </a>
      <p>TIL Contribute Visualization</p>
      <p>Jihyun, Chaekyung, Yoojeong, Darae</p>
      <div className="writeBtn">
        <Button
          className="header_write-btn"
          size="large"
          onClick={showModal}
        >여기에 글을 쓰고 잔디를 심어보세요.</Button>
        <CreateForm
          imageUploader={imageUploader}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
