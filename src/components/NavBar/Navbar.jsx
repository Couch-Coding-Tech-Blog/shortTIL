import React, { useState } from "react";
import "./NavBar.css";
import { Layout, Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import CreateForm from "./CreateForm";

const { Header } = Layout;

const Navbar = (props) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const onCreate = (values) => {
    console.log("받은 새 글: ", values);
    setVisible(false);
  };

  return (
    <Header className="header">
      <div className="header_logo">ReactJS Team Project</div>
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
