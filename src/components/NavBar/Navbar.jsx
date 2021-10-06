import React, { useState } from "react";
import "./NavBar.css";
import { Layout, Button, Input, Select } from "antd";
import { EditFilled } from "@ant-design/icons";
import CreateForm from "./CreateForm";
import "antd/dist/antd.css";

const { Header } = Layout;
const { Search } = Input;
const { Option } = Select;

const Navbar = ({ onAdd,handleSearchChange,handleSelectChange,searchType }) => {
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
    };
    console.log(newPost);
    onAdd(newPost);
    setVisible(false);
  };

  return (
    <Header className="header">
      <div className="header_logo">ReactJS Team Project</div>

      <Input.Group compact style={{ width: "100%", maxWidth: "500px" }}>
        <Select defaultValue="title" onChange={handleSelectChange} value={searchType}>
          <Option value="title">title</Option>
          <Option value="body">body</Option>
          <Option value="tags">tags</Option>
        </Select>
        <Input style={{ width: '50%' }} onChange={handleSearchChange}/>
      </Input.Group>

      <div>
        <Button
          className="header_write-btn"
          size="large"
          icon={<EditFilled />}
          onClick={showModal}
        />
        <CreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    </Header>
  );
};

export default Navbar;
