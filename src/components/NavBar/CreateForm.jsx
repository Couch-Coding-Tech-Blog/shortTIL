import React, { useRef, useState } from "react";
import { Modal, Form, Input, Alert, Tag, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./NavBar.css";

const { TextArea } = Input;
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CreateForm = ({ visible, onCreate, onCancel, imageUploader }) => {
  const tagsRef = useRef(null);
  const tagsBoxRef = useRef();
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);

  const createTags = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const value = tagsRef.current.state.value;
      setTags([...tags, value]);
      form.resetFields(["tags"]);
      // tagsRef.current.state.value = "";
      tagsRef.current.focus({
        cursor: "start",
      });
    }
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.thumbUrl) {
      file.thumbUrl = await getBase64(file.file.originFileObj);
    }
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  const handleChange = async ({ fileList }) => {
    const newFileIndex = fileList.length - 1;
    const uploaded = await imageUploader.upload(
      fileList[newFileIndex].originFileObj
    );
    fileList[newFileIndex].url = uploaded.url;
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      centered
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
            const tagBox = Array.from(tagsBoxRef.current.childNodes)
              .filter((node) => node.className.indexOf("ant-tag-hidden") === -1)
              .map((node) => node.innerText);
            values.tags = tagBox;
            values.images = fileList;
            onCreate(values);
            setTags([]);
            setFileList([]);
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
            {tags.map((tag, idx) => (
              <Tag key={idx} closable color="blue">
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
              ref={tagsRef}
              placeholder="태그"
              onKeyDown={createTags}
              onFocus={() => setAlertVisible(true)}
              onBlur={() => setAlertVisible(false)}
            />
          </Form.Item>
        </div>
        <Alert
          message="쉼표 혹은 엔터를 입력하여 태그를 등록할 수 있습니다."
          type="info"
          banner={true}
          className={alertVisible ? "showAlert" : "hideAlert"}
        />
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="previewImg" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form>
    </Modal>
  );
};

export default CreateForm;
