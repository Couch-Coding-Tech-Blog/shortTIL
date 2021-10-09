import React, { useState, useEffect, useRef, useReducer } from "react";
import { Layout, Button, Input, Select, Spin } from "antd";
import { EditFilled } from "@ant-design/icons";
import Navbar from "../components/Header/Header";
import CardComponent from "../components/Card/CardComponent";
import Grass from "../components/Contribute/Contribute";
import axios from "axios";
import "./Main.scss";
import TagFiltering from "../components/TagFiltering";

const { Option } = Select;

function Main({ imageUploader }) {
  const [postData, setPostData] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteringData, setFilteringData] = useState([]);
  const [postNum, setPostNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const perPage = 12;
  const [element, setElement] = useState(null);
  const reducer = (state, action) => {
    switch (action.type) {
      case "start":
        return { ...state, loading: true };
      case "loaded":
        return {
          ...state,
          loading: false,
          data: [...state.data, ...action.newData],
          more: action.newData.length === perPage,
          after: state.after + action.newData.length,
        };
      default:
        throw Error("Don't understand action");
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    more: true,
    data: [],
    after: 0,
  });
  const load = () => {
    dispatch({ type: "start" });
    setTimeout(() => {
      const newData = postData.slice(after, after + perPage);
      dispatch({ type: "loaded", newData });
    }, 300);
  };

  const { loading, data, after, more } = state;
  const loader = useRef(load);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    loader.current = load;
  }, [load]);

  useEffect(() => {
    //searchTerm여부에 따라 전체검색 or 필터검색 실행
    searchTerm ? getFilterData() : getData();
  }, [searchTerm, searchType, postNum]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

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
  };
  const handleSelectChange = (event) => {
    setSearchType(event);
  };
  const handleFiltering = (event) => {
    if (event.target.innerText === "ALL") {
      setFiltered(false);
      return;
    }
    // const matchedData = postData.filter(
    //   (post) =>
    //     post.tags && post.tags.some((tag) => tag === event.target.innerText)
    // );
    const matchedData = postData.filter(
      (post) =>
        post.tags &&
        post.tags.some((tag) => {
          const regExpSpecial =
            /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
          const regExpKor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
          const regExpNum = /[0-9]/g;
          const regExpEng = /[a-zA-Z]/g;
          if (
            tag != null &&
            !regExpKor.test(tag) &&
            !regExpNum.test(tag) &&
            !regExpSpecial.test(tag) &&
            regExpEng.test(tag)
          ) {
            return tag.toUpperCase() === event.target.innerText.toUpperCase();
          } else {
            return false;
          }
        })
    );
    setFilteringData(matchedData);
    setFiltered(true);
  };

  return (
    <>
      <Navbar
        onAdd={onAdd}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        searchType={searchType}
        imageUploader={imageUploader}
      />
      <Grass postData={postData} />
      <TagFiltering onFiltering={handleFiltering} />
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
                    ></CardComponent>
                  ))}
                </>
              ) : (
                <>
                  {data.map((post) => (
                    <CardComponent
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      body={post.body}
                      imagefile={post.uploaded_images}
                      imageUploader={imageUploader}
                      tags={post.tags}
                    ></CardComponent>
                  ))}
                </>
              )}
            </div>
            {loading && (
              <div className="spin">
                <Spin />
              </div>
            )}
            {!loading && more && <div ref={setElement}></div>}
          </div>
        </div>
      </section>
      <footer>© {new Date().getFullYear()} TIL Team</footer>
    </>
  );
}

export default Main;
