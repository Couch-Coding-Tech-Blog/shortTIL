import React, {useState} from 'react';
import { Card, Modal } from 'antd';

const { Meta } = Card;

function CardComponent(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <Modal title={props.title} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => setIsModalVisible(false)}>
      <p>{props.body}</p>
    </Modal>
    </div>  
  );
}

export default CardComponent;