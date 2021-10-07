import React, { useState, useEffect } from "react";
import Navbar from "../components/Header/Header";
import CardComponent from "../components/Card/CardComponent";
import Grass from "../components/Contribute/Contribute";
import axios from "axios";
import "./Main.scss";

function Main({ imageUploader }) {
  const [postData, setPostData] = useState([]);
  const [postNum, setPostNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");

  useEffect(() => {
    //searchTerm여부에 따라 전체검색 or 필터검색 실행
    searchTerm ? getFilterData(): getData();
  }, [searchTerm, searchType, postNum]);

  async function getData() {
    const res = await axios.get(
      "http://localhost:4000/posts?_sort=id&_order=desc"
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
    
  }
  const handleSelectChange = (event) =>{
    setSearchType(event);
  }


  return (
    <div>
      <Navbar onAdd={onAdd} handleSearchChange={handleSearchChange} handleSelectChange={handleSelectChange} searchType={searchType} imageUploader={imageUploader}/>
      <Grass postData={postData} />
      <p style={{paddingTop: "40px", width: "100%", textAlign: "center"}}>Posts</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="cards">
          {postData.map((post) => (
            <CardComponent
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              imageUploader={imageUploader}
            ></CardComponent>
          ))}
        </div>
      </div>
      <footer>© {new Date().getFullYear()} TIL Team</footer>
    </div>
  );
}

export default Main;
