import React, { useState  } from "react";
import { Card, Modal, Button, Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.scss";
import { Carousel } from "antd";

const { TextArea } = Input;
const { confirm } = Modal;
const { Meta } = Card;

function CardComponent(props) {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { visible, loading } = useState(false);
  const [postNum, setPostNum] = useState([]);
  const [editing, setEditing] = useState(true);
  const [editTxt, setEditTxt] = useState({title:"",body:""});



  const [newTitle, setNewTitle] = useState(props.title);
  const [newBody, setNewBody] = useState(props.body);

  console.log(
    props.imagefile != undefined && props.imagefile[0] != undefined
      ? props.imagefile[0].url
      : null
  );

  const ShowImages = () => {
    if (props.imagefile === undefined) return <div></div>;
    else {
      return (
        <Carousel autoplay style={{ backgroundColor: "#0D6FFF" }}>
          {props.imagefile.map((file, idx) => (
            <img
              key={idx}
              src={file.url ? file.url : file.thumbUrl}
              style={{ width: "400px" }}
            />
          ))}
        </Carousel>
      );
    }
  };

  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setNewTitle(value);
  };
  const onChangeBody = (event) => {
    const {
      target: { value },
    } = event;
    setNewBody(value);
  };

  const onUpdate = async () => {
    console.log(editTxt)

    await axios.patch(
      `http://localhost:4000/posts/${props.id}`,
      {
          title: editTxt.title,
          body: editTxt.body,
      }
    );
    setEditing(true); 
    props.editPostData(props.id,editTxt)

  };




  function showDeleteConfirm() {
    confirm({
      title: "포스팅을 삭제할까요?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "네",
      okType: "danger",
      cancelText: "아니요",
      centered: "yes",
      onOk() {
        // console.log('Yes');
        props.onDel(props);
        setEditing(true);
        setIsModalVisible(false);
      },
      onCancel() {
        setEditing(true);
        console.log("No");
      },
    });
  }

  function onchangeEditInput(event,type){
    let str = editTxt;
    str[type] = event.target.value
    setEditTxt(str);
  }

  

  return (
    <>
      <Card
        hoverable
        style={{ width: 300, margin: "1rem", height: 300 }}
        cover={
          <img
            alt="example"
            src={
              props.imagefile != undefined && props.imagefile[0] != undefined
                ? props.imagefile[0].url
                : "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80"
            }
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        }
        onClick={() => setIsModalVisible(true)}
      >
        <div className="cardText">
          <Meta title={props.title} description={props.body} />
        </div>
      </Card>
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditing(true);
        }}
        onOk={editing}
        footer={[]}
        centered
      >
        {editing ? (
          <div className="ModalEdit">
            <ShowImages></ShowImages>
            <h1>{props.title}</h1>
            <p> {props.body}</p>
            <div style={{ marginBottom: "1rem", display: "flex" }}>
              {props.tags &&
                props.tags.map((tag, idx) => (
                  <Button
                    key={idx}
                    type="primary"
                    style={{ marginRight: "0.5rem" }}
                  >
                    #{tag}
                  </Button>
                ))}
            </div>
            <div className="btnArea">
              <Button size="medium" onClick={() => setEditing(false)}>
                수정
              </Button>
              <Button
                size="medium"
                onClick={showDeleteConfirm}
                type="danger"
                ghost
              >
                삭제
              </Button>
            </div>
          </div>
        ) : (
          <div className="ModalEditForm">
            <ShowImages></ShowImages>
            <Input onChange={(event)=>onchangeEditInput(event,"title")} defaultValue={`${props.title}`} />
            <TextArea onChange={(event)=>onchangeEditInput(event,"body")} defaultValue={`${props.body}`} />

            <div style={{ marginBottom: "1rem", display: "flex" }}>
              {props.tags.map((tag, idx) => (
                <Button key={idx} type="primary">
                  #{tag}
                </Button>
              ))}
            </div>
            <div className="btnArea">
              <Button
                size="medium"
                onClick={onUpdate}
                type="primary"
                style={{ marginRight: "0.5rem" }}
              >
                수정완료
              </Button>
              <Button
                size="medium"
                onClick={() => setEditing(true)}
                type="primary"
                ghost
              >
                취소
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CardComponent;
