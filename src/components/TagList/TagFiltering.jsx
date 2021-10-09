import { Button } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";

const TagFiltering = ({ onFiltering, tags }) => {
  const [categoryList, setCategoryList] = useState([]);
  const wholeTags = [];
  const [visible, setVisible] = useState(false);

  const getPopularArr = (array) => {
    const counts = array.reduce((pv, cv) => {
      pv[cv] = (pv[cv] || 0) + 1;
      return pv;
    }, {});
    const result = [];
    for (let key in counts) {
      result.push([key, counts[key]]);
    }
    result.sort((first, second) => {
      return second[1] - first[1];
    });
    return result;
  };

  useEffect(() => {
    const tagLength = 9;
    tags.forEach((tag) => tag && wholeTags.push(...tag));
    const popularTags = getPopularArr(wholeTags)
      .slice(0, tagLength)
      .map((tag) => tag[0]);
    if (popularTags.length > 0) popularTags.unshift("ALL");
    setCategoryList(popularTags);
    setVisible(true);
  }, [tags]);

  return (
    <div className="tag-warp">
      {visible && (
        <div className="tag-box">
          {/* <p>The Most Popular Tags</p>*/}
          <div className="tags">
            {categoryList.map((category, idx) => (
              <Button onClick={onFiltering} key={idx} shape="round">
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFiltering;
