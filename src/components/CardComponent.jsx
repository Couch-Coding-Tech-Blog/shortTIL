import React, {useState} from 'react';
import { Card, Modal, Button, Form, Input } from 'antd';
import Editform from "./editform";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { confirm } = Modal;
const { Meta } = Card;

function CardComponent(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { visible, loading } = useState(false);

  function info() {
    Modal.info({
      title: '수정 화면 타이틀',
      icon: false,
      content: (
        <div>
          <p>수정 할 내용</p>
        </div>
      ),
      onOk() {},
    });
  }

  function showDeleteConfirm() {
    confirm({
      title: '삭제하시겠습니까',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        setIsModalVisible(false)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  return (
    <div>
      <Card
        hoverable
        style={{ width: 300, margin: "1rem" }}
        cover={<img alt="example" src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80"/>}
        onClick={() => setIsModalVisible(true)}
      >
        <Meta title={props.title} description={props.body} />
      </Card>
      <Modal title={props.title} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={info}
        footer={[
        <Button className="header_write-btn" size="medium" onClick={info}>
          수정
        </Button>,
        <Button className="header_write-btn" size="medium" onClick={showDeleteConfirm}>
          삭제
        </Button>
      ]}
      >
        <p>{props.body}</p>
      </Modal>
    </div>  
  );
}

export default CardComponent;