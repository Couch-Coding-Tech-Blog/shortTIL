import React, { useRef, useState } from "react";
import { Modal, Form, Input, Alert, Tag } from "antd";
import "./NavBar.css";

const { TextArea } = Input;
const CreateForm = ({ visible, onCreate, onCancel }) => {
  const tagsRef = useRef();
  const tagsBoxRef = useRef();
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [tagsRes, setTagsRes] = useState("");

  const showTagAlert = () => {
    if (!tagsRef.current.state.focused) setAlertVisible(false);
  };

  const createTags = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const value = tagsRef.current.state.value;
      setTags([...tags, value]);
      form.resetFields(["tags"]);
      tagsRef.current.focus();
      const tagBox = Array.from(tagsBoxRef.current.childNodes).map(
        (node) => node.innerText
      );
      setTagsRes(tagBox);
    }
  };
  return (
    <Modal
      visible={visible}
      title="새 글 작성"
      okText="등록"
      cancelText="취소"
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values.tags = tagsRes;
            onCreate(values);
            setTags([]);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} name="form_in_modal">
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "제목을 입력하세요.",
            },
          ]}
        >
          <Input placeholder="제목" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "내용을 입력하세요.",
            },
          ]}
        >
          <TextArea placeholder="내용" autoSize={{ minRows: 9, maxRows: 9 }} />
        </Form.Item>
        <div style={{ display: "flex" }}>
          <div ref={tagsBoxRef}>
            {tags.map((tag) => (
              <Tag closable color="blue">
                {tag}
              </Tag>
            ))}
          </div>
          <Form.Item
            name="tags"
            rules={[
              {
                required: false,
                message: "태그를 입력하세요.",
              },
            ]}
          >
            <Input
              placeholder="태그"
              onKeyDown={createTags}
              ref={tagsRef}
              onChange={showTagAlert}
              onClick={() => setAlertVisible(true)}
            />
          </Form.Item>
        </div>
      </Form>
      <Alert
        message="쉼표 혹은 엔터를 입력하여 태그를 등록할 수 있습니다."
        type="info"
        banner={true}
        className={alertVisible ? "showAlert" : "hideAlert"}
      />
    </Modal>
  );
};

export default CreateForm;
