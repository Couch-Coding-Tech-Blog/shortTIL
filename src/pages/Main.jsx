import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import CardComponent from '../components/CardComponent';
import axios from 'axios';

function Main() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function getData(){
      const res = await axios.get("http://localhost:4000/posts");
      setPostData(res.data);
    }
    getData();
    console.log('1', postData);
  }, [])

  console.log('2', postData);

  return (
    <div>
      <Navbar></Navbar>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
      {postData.map(post => 
        <CardComponent title={post.title} body={post.body}></CardComponent>
      )}
      </div>
    </div>
  );
}

export default Main;
