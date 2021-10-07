import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import CardComponent from "../components/CardComponent";
import Grass from "../components/NavBar/Grass";
import axios from "axios";
import "./Main.css";

function Main() {
  const [postData, setPostData] = useState([]);
  const [postNum, setPostNum] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await axios
      .get("http://localhost:4000/posts?_sort=id&_order=desc");
      setPostData(res.data);
    }
    console.log(postData);
    getData();
  }, [postNum]);

  const onAdd = async (newPost) => {
    await axios.post("http://localhost:4000/posts", {
      ...newPost,
    });
    setPostNum(postNum + 1);
  };

  return (
    <div>
      <Navbar onAdd={onAdd} />
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
            ></CardComponent>
          ))}
        </div>
      </div>
      <footer>© {new Date().getFullYear()} TIL Team</footer>
    </div>
  );
}

export default Main;
