<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import CardComponent from "../components/CardComponent";
import { Row, Col, Space } from "antd";
=======
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import CardComponent from '../components/CardComponent';
import {Row, Col, Button} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
>>>>>>> 9195a0f5dace19046799790712a91921e8891eeb
// import axios from 'axios';

function Main() {
  const [postData, setPostData] = useState([]);

  // useEffect(() => {
  //   async function getData(){
  //     const res = await axios.get("http://localhost:3000/posts/");
  //     const data = await JSON.parse(res);
  //     setPostData(...postData, data);
  //   }
  //   getData();
  //   console.log('1', postData);
  // }, [])

  // console.log('2', postData);

  return (
    <div>
<<<<<<< HEAD
      <Navbar />
      <Row>
=======
      <Navbar></Navbar>
      <Button icon={<CaretRightOutlined />}></Button>
      <Row >
>>>>>>> 9195a0f5dace19046799790712a91921e8891eeb
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
        <Col span={6}>
          <CardComponent></CardComponent>
        </Col>
      </Row>
    </div>
  );
}

export default Main;
