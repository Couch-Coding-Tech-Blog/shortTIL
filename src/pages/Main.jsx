import React, { useState, useEffect, useRef, useReducer } from "react";
import { Layout, Button, Input, Select, Spin } from "antd";
import { EditFilled } from "@ant-design/icons";
import Header from "../components/Header/Header";
import CardComponent from "../components/Card/CardComponent";
import Grass from "../components/Contribute/Contribute";
import axios from "axios";
import "./Main.scss";
import TagFiltering from "../components/TagList/TagFiltering";

const { Option } = Select;

function Main({ imageUploader }) {
  const [postData, setPostData] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteringData, setFilteringData] = useState([]);
  const [postNum, setPostNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");

  useEffect(async () => {
    searchTerm ? getFilterData() : getData();
  }, [searchTerm, searchType, postNum]);

  async function getData() {
    const res = await axios.get(
      "http://localhost:4000/posts?_sort=id&_order=desc&${}"
    );
    setPostData(res.data);
  }

  async function getFilterData() {
    const res = await axios.get(
      `http://localhost:4000/posts?_sort=id&_order=desc&${searchType}_like=${searchTerm}`
    );
    setPostData(res.data);
  }

  const onAdd = async (newPost) => {
    await axios.post("http://localhost:4000/posts", {
      ...newPost,
    });
    setPostNum(postNum + 1);
  };
  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSearchType(event);
  };
  const handleFiltering = (event) => {
    if (event.target.innerText === "ALL") {
      setFiltered(false);
      return;
    }
    const matchedData = postData.filter(
      (post) =>
        post.tags && post.tags.some((tag) => tag === event.target.innerText)
    );
    setFilteringData(matchedData);
    setFiltered(true);
  };


  
  const onDel = async (newPost) => {
    await axios.delete(`http://localhost:4000/posts/${newPost.id}`, {
      ...newPost,
    });
    setPostNum(postNum - 1);
    console.log("delete");
    // setEditing(true);
  };
  

  const onUpdateMain = () => {
    getData()
  };

  return (
    <>
      <Header
        onAdd={onAdd}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        searchType={searchType}
        imageUploader={imageUploader}
      />
      <Grass postData={postData} />
      <TagFiltering
        onFiltering={handleFiltering}
        tags={postData.map((item) => item.tags)}
      />
      <section className="cardgrid">
        <div className="inner">
          <div className="cardheader">
            <p>All Posts</p>
            <Input.Group compact className="search">
              <Select
                defaultValue="title"
                onChange={handleSelectChange}
                value={searchType}
              >
                <Option value="title">Title</Option>
                <Option value="body">Body</Option>
                <Option value="tags">Tags</Option>
              </Select>
              <Input
                onChange={handleSearchChange}
                placeholder="search"
                className="input"
              />
            </Input.Group>
          </div>
          <div className="grid">
            <div className="cards">
              {filtered ? (
                <>
                  {filteringData.map((post) => (
                    <CardComponent
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      body={post.body}
                      imagefile={post.uploaded_images}
                      imageUploader={imageUploader}
                      tags={post.tags}
                      onDel={onDel}
                      onUpdateMain={onUpdateMain}
                    ></CardComponent>
                  ))}
                </>
              ) : (
                <>
                  {postData.map((post) => (
                    <CardComponent
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      body={post.body}
                      imagefile={post.uploaded_images}
                      imageUploader={imageUploader}
                      tags={post.tags}
                      onDel={onDel}
                      onUpdateMain={onUpdateMain}
                    ></CardComponent>
                  ))}
                </>
              )}
            </div>
            {/* {loading && (
              <div className="spin">
                <Spin />
              </div>
            )}
            {!loading && more && (
              <div style={{ backgroundColor: "green" }} ref={setElement}></div>
            )} */}
          </div>
        </div>
      </section>
      <footer>© {new Date().getFullYear()} TIL Team</footer>
    </>
  );
}

export default Main;
