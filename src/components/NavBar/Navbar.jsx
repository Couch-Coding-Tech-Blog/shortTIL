import React from "react";
import "./NavBar.css";
import { Layout, Menu, Button } from "antd";
// import { EditOutlined } from "@ant-design/icons";

const { Header } = Layout;

function Navbar() {
  return (
    <Header className="header">
      <div className="header_logo">ReactJS Team Project</div>
      {/* <Button
        className="header_write-btn"
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      /> */}
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <button>버튼</button>
      </Menu> */}
    </Header>
  );
}

export default Navbar;
