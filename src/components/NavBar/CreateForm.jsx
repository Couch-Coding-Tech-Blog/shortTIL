import React from "react";
import { Modal, Form, Input } from "antd";
const { TextArea } = Input;
const CreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="새 글 작성"
      okText="등록"
      cancelText="취소"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
      </Form>
    </Modal>
  );
};

export default CreateForm;
