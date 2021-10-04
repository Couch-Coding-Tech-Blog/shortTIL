import React from 'react';
import { Menu, Layout } from 'antd';

const { Header } = Layout;

function Navbar() {
  return (
    <Header>
      <div>ReactJS Team Project</div>
      <Menu theme="light" mode="horizontal">
      </Menu>
    </Header>
  );
}

export default Navbar;